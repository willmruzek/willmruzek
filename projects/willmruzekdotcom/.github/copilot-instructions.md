# AI contributor guide for this repo

## Overview

- Stack: Next.js App Router (v15) with the Nextra v4 blog theme and MDX content.
- Package manager: `pnpm` (use `pnpm` for all install/run commands).
- Content lives under `content/thoughts/**` grouped by year; routes live in `src/app/**`.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## Core utilities

- Prefer the helpers in `src/lib/post-utils.ts`:
  - `getBlogYearsWithPosts()` lists blog posts grouped by year.
  - `importBlogPost()` loads an individual post and validates metadata via Zod.
  - `buildPostMetadata()` creates `Metadata` for post pages.
- `src/lib/blog-utils.ts` is legacy; its `getBlogPosts()` assumes a different content layout and shouldn’t be used without refactoring.
- Date display: use `formatDateForDisplay()` from `src/lib/blog-utils.ts`.

## Content and metadata

- Frontmatter schema: `content/schemas/main.json`.
  - Required: `title` (string, 1–120 chars).
  - Optional: `description`, `author`, `date` (`YYYY-MM-DD`), `tags` (string array), `featured` (boolean), `image` (string path for custom OG image).
- Runtime validation happens in `src/lib/schemas.ts` (`BlogPostMetadataSchema`). It requires `title`, `author`, `description`, and coerces `date` to a `Date`; it also expects Nextra-provided fields like `filePath`, optional `timestamp`, and `readingTime`.
- Quote date strings in MDX frontmatter to avoid YAML coercion.
- Missing titles render as “Untitled”; fix frontmatter when practical.
- OG images: generated automatically unless the `image` field is supplied. The script lives at `scripts/generate-og.mts` and outputs files to `public/og/**`.

## Routing and data flow

- Blog index (`src/app/thoughts/page.tsx`) fetches posts via `getBlogYearsWithPosts()` and renders `PostListItem` entries grouped by year.
- Post pages (`src/app/thoughts/[year]/[slug]/page.tsx`):
  - `generateStaticParams()` reads `getBlogYearsWithPosts()` respecting feature flags.
  - `generateMetadata()` delegates to `buildPostMetadata()`.
  - The page imports the MDX module with `importBlogPost()` and renders it through `BlogPostWrapper`.
- RSS feed (`src/app/thoughts/rss.xml/route.ts`) iterates posts with `getBlogYearsWithPosts()` and `importBlogPost()` to build items.

## Feature toggles

- `src/lib/feature-config.ts` controls whether the blog is enabled (e.g., via environment or config). The middleware guards routes accordingly. Respect this toggle when adding routes or APIs around blog content.

## Styling and components

- Tailwind CSS with custom baseline utilities is used; see `src/app/globals.css` and the `packages/tailwind-typography-baseline` package.
- Shared MDX components are registered in `src/mdx-components.tsx`. Reuse them instead of duplicating markup.
- Theme components for the blog live under `src/components/theme/**`.

## Tooling & linting

- Run scripts with `pnpm`:
  - `pnpm dev` – local dev server (Turbopack).
  - `pnpm build` – production build.
  - `pnpm lint` – ESLint (flat config in `eslint.config.mjs`).
  - `pnpm tsc` – type checking.
- `prebuild` script runs lint before builds.
- Markdown/MDX linting is configured via `.remarkrc.mjs` using `remark-lint-frontmatter-schema`.
- ESLint flat config bridges Next.js defaults and MDX support; the legacy `.eslintrc.js` exists only for `import/no-unused-modules` compatibility.

## Testing & quality gates

- Before finishing work, prefer running:
  - `pnpm lint`
  - `pnpm tsc`
  - `pnpm build` (if changes affect build output or routing)
- Mention which checks were executed (or intentionally skipped) in summaries.

## Contribution guidelines for agents

- Use the provided utilities (`post-utils.ts`, `feature-config.ts`) rather than reimplementing Nextra or filesystem logic.
- Keep metadata minimal and consistent; don’t introduce new frontmatter fields without updating both schema and Zod validation.
- Maintain content structure (`content/thoughts/<year>/<slug>.mdx`) and ensure new posts include valid frontmatter.
- When adding components, colocate them under `src/components/**` and follow existing naming conventions.
- If you see additional issues beyond the requested changes, ask the human author before tackling them (per repository instructions).
