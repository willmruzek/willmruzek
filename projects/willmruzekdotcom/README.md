# willmruzek.com

A modern, personal website and blog built with Next.js 16 and Nextra.

## Technical Highlights

### Precision Typography with Baseline Grid

- **Custom baseline grid system** (`tailwind-typography-baseline`) for pixel-perfect vertical rhythm
- Configurable baseline unit ensures consistent spacing across all elements
- This will be its own package eventually

### Type-Safe Content Pipeline

- **Zod + JSON Schema** validation for MDX frontmatter
- Runtime type checking ensures no invalid metadata reaches production
- TypeScript end-to-end for complete type safety
- [Homepage biography](data/homepage.md) is shared Markdown, rendered on the homepage and included verbatim in AI chat context. Edit it to update both; the header, photograph, obfuscated email, and social icons remain React components.
- [Resume data](data/resume.yaml) supplies the site-wide metadata author, keywords, and default title; its name and headline form the metadata description. The resume page inherits that description. Keep shared facts in the homepage and [GitHub profile](../../README.md) aligned when editing the resume; GitHub may also feature tooling projects not listed on the website.

### Modern Next.js Architecture

- **Next.js 16** with App Router and React Server Components
- **Turbopack** for fast dev builds
- Static generation for optimal performance
- Feature flags for conditional rendering

### Resume PDFs

Run `pnpm --filter @willmruzek/willmruzekdotcom run print` to regenerate the public resume PDF. Set `RESUME_PRIVATE_EMAIL` in `.env.local` (see [.env.local.example](.env.local.example)) to also generate `private/WillMruzekResume.pdf` on every print run, including the resume pre-commit hook. An exported environment variable takes precedence over the file.

The private email is substituted only in the print browser after the public PDF is saved; the resume YAML and public page stay unchanged. Both `.env.local` and `private/` are Git-ignored, and private PDFs are outside the public web directory. Never place the private email in a `NEXT_PUBLIC_*` variable or copy the private PDF into `public/`.

If the variable is missing or blank, printing warns and generates only the public PDF; an existing private PDF is not updated. An invalid email fails printing.

### AI Chat History

Chat messages, including streamed updates, are saved in this browser's `localStorage` under `willmruzek:chat-history:v1`. History survives reloads and page navigation but is not synced across browsers or devices. Restored conversations stay closed until the chat input is focused; restoring history does not make an AI request. Sending a new prompt includes the restored conversation as context.

Closing the panel does not delete history. Remove the storage key or clear the site's browser storage to reset it. Saved messages are validated before loading; invalid history is discarded. If storage is blocked or full, chat remains usable, but new messages may not be saved.

### Content-First Development

- **Nextra** MDX engine with built-in page mapping
- The MDX catch-all checks content-derived routes before importing pages or metadata; unknown URLs return 404 without missing-module errors
- Organized content structure: `content/thoughts/[year]/[slug].mdx`
- Advanced code highlighting with line numbers, diffs, and copy buttons
- Image zoom, footnotes, and rich Markdown features

## Tech Stack

### Core

- **Next.js 16.4.3** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **pnpm** - Fast package manager

### Content & Theming

- **Nextra 4.2.17** - MDX static site generator
- **Zod 4.0.15** - Runtime schema validation
- **remark-lint-frontmatter-schema** - Content validation

### Styling

- **Tailwind CSS 4.1.12** - Utility-first CSS
- **next-themes** - Dark/light mode
- **next-view-transitions** - Smooth page transitions

### Developer Experience

- **ESLint 9** with flat config - JS/TS and MDX linting
- **Prettier 3.6.2** - Code formatting
- **eslint-plugin-mdx** - MDX-specific linting

## Planned Improvements

### Content & Discovery

- [ ] Search functionality
- [ ] Tag/category pages
- [ ] Related posts at end of articles

### Performance

- [ ] Image optimization with next/image
- [ ] Bundle analysis
- [ ] Preload critical resources

### SEO & Discoverability

- [ ] Sitemap generation
- [ ] Structured data (JSON-LD)
- [ ] Dynamic OG image generation
- [ ] robots.txt

### Developer Experience

- [ ] Pre-commit hooks (Husky + lint-staged)
- [ ] Generate JSON Schema from Zod schemas for ESLint frontmatter validation
- [ ] Type-safe environment variables
- [ ] Storybook for components

### Content Management

- [ ] Content templates for new posts
- [ ] Frontmatter autocomplete from schema

### Accessibility

- [ ] Skip navigation link
- [ ] Focus indicator audit
- [ ] Color contrast audit
- [ ] ARIA landmarks

### Analytics & Monitoring

- [ ] Privacy-first analytics
- [ ] Web Vitals tracking
- [ ] Error monitoring
- [ ] Uptime monitoring

### Features

- [ ] Series/multi-part posts
- [ ] Code playground integration

### Content Ideas

- [ ] /now page
- [ ] /uses page

See [TODO.md](TODO.md) for detailed implementation plans and rationale for each item.
