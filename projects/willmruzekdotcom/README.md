# willmruzek.com

A modern, personal website and blog built with Next.js 15 and Nextra.

## Technical Highlights

### Precision Typography with Baseline Grid

- **Custom baseline grid system** (`tailwind-typography-baseline`) for pixel-perfect vertical rhythm
- Configurable baseline unit ensures consistent spacing across all elements
- This will be its own package eventually

### Type-Safe Content Pipeline

- **Zod + JSON Schema** validation for MDX frontmatter
- Runtime type checking ensures no invalid metadata reaches production
- TypeScript end-to-end for complete type safety

### Modern Next.js Architecture

- **Next.js 15** with App Router and React Server Components
- **Turbopack** for fast dev builds
- Static generation for optimal performance
- Feature flags for conditional rendering

### Content-First Development

- **Nextra** MDX engine with built-in page mapping
- Organized content structure: `content/thoughts/[year]/[slug].mdx`
- Advanced code highlighting with line numbers, diffs, and copy buttons
- Image zoom, footnotes, and rich Markdown features

## Tech Stack

### Core

- **Next.js 15.4.1** - React framework with App Router
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
