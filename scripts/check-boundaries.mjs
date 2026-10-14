import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve();

async function walk(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(root, e.name)) : [path.join(root, e.name)],
      ),
    )
  ).flat();
}

// Import specifiers that resolve to a file inside the repository.
const resolutionExtensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

async function resolves(target) {
  const results = await Promise.all(
    resolutionExtensions.map(async (extension) => {
      try {
        await stat(target + extension);
        return true;
      } catch {
        return false;
      }
    }),
  );
  return results.some(Boolean);
}

const errors = [];
for (const directory of ["components", "primitives", "hooks", "lib"]) {
  for (const file of (await walk(directory)).filter((f) => /\.[jt]sx?$/.test(f))) {
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(
      /(?:from\s+|import\s*\(|import\s+)(["'])([^"']+)\1/g,
    )) {
      const specifier = match[2];
      if (specifier.startsWith("@/")) {
        errors.push(`${file}: internal imports must be relative, found ${specifier}`);
        continue;
      }
      if (!specifier.startsWith(".")) continue;
      const target = path.resolve(path.dirname(file), specifier);
      if (!target.startsWith(repoRoot + path.sep)) {
        errors.push(`${file}: ${specifier} resolves outside the repository`);
        continue;
      }
      if (target.startsWith(path.resolve("vendor") + path.sep)) {
        errors.push(`${file}: ${specifier} resolves into vendor/`);
        continue;
      }
      if (!(await resolves(target))) {
        errors.push(`${file}: ${specifier} does not resolve to a file`);
      }
    }
  }
}
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  "components/, primitives/, hooks/, and lib/ use only relative internal imports that stay inside the repository.",
);
