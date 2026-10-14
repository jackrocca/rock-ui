# RockUI

`@jackrocca/rock-ui` is a standalone React component library: small prop APIs, accessible [Base UI](https://base-ui.com) behavior, and shared Tailwind tokens. It is extracted from the RockUI source fork of [Kitze UI](https://ui.kitze.io) so it can be installed and used in any application without depending on `jackrocca.com` or custom `@/ui` path aliases. Upstream provenance is preserved; see `THIRD_PARTY_NOTICES.md`.

- `components/`: ergonomic APIs such as `CustomButton`, `SimpleSelect`, and `ResponsiveDialog`.
- `primitives/`: low-level Base UI compositions.
- `hooks/` and `lib/`: UI-only helpers and types.
- `theme.css`: the shared visual tokens. Import it once, globally.
- `vendor/kitze-ui/`: complete, unmodified published registry snapshot, extracted source, documentation, and checksums. Never import from `vendor/` at runtime.

Live docs and interactive demos: https://jackrocca.com/ui

## Install

```bash
npm install github:jackrocca/rock-ui
# or, pinned:
npm install github:jackrocca/rock-ui#v0.1.0
```

React 19 and React DOM 19 are peer dependencies. Next.js is an optional peer dependency (only components that use `next/link` or `next-themes` need it).

## Setup

### 1. Transpile the package

The package ships uncompiled TSX, so let your bundler compile it. In Next.js, add it to `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: ["@jackrocca/rock-ui"],
};
```

### 2. Import the theme

In your global stylesheet (e.g. `globals.css`):

```css
@import "@jackrocca/rock-ui/theme.css";
```

### 3. Use the components

Import directly from the package subpaths:

```tsx
import { CustomButton } from "@jackrocca/rock-ui/components/CustomButton";
import { Button } from "@jackrocca/rock-ui/primitives/button";
import { useMounted } from "@jackrocca/rock-ui/hooks/useMounted";
import { cn } from "@jackrocca/rock-ui/lib/utils";
```

### Optional: keep `@/ui/*` imports

If you are migrating an app that already imports from `@/ui/…`, map the alias in `tsconfig.json` instead of rewriting imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/ui/*": ["./node_modules/@jackrocca/rock-ui/*"]
    }
  }
}
```

Your bundler must resolve the same paths at runtime (e.g. webpack/Turbopack alias config). Import `theme.css` by its package path (`@jackrocca/rock-ui/theme.css`) rather than through the alias, since CSS tooling does not read TypeScript path mappings.

## Developing RockUI itself

- `npm run check` — boundary checks (`check:boundaries`), upstream snapshot verification (`ui:verify`), and `typecheck`.
- `npm run ui:prepare -- component-name` — stage a component and its registry dependencies from `vendor/kitze-ui` under `work/ui-candidates/`, with imports rewritten to relative paths. Review the staged sources, `dependencies.json`, and `primitive-dependencies.json` before copying accepted changes into `components/`, `primitives/`, `hooks/`, or `lib/`.
- `npm run ui:snapshot` — download a fresh upstream candidate into `work/` for comparison. It never alters the accepted snapshot in `vendor/kitze-ui`.

All internal imports inside `components/`, `primitives/`, `hooks/`, and `lib/` are relative; `scripts/check-boundaries.mjs` enforces that nothing imports `@/` aliases, escapes the repository root, or reaches into `vendor/`.

Keep component APIs small; customize tokens in `theme.css` or a shared component before adding one-off wrappers. Preserve labels, native button semantics, disabled behavior, keyboard focus, mobile dismissal, and reduced motion.
