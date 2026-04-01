# Potential enhancements (cherry picked from Sonnet 4.5 list)

## Content & Discovery

### 1. Search Functionality
**Current State**: No search capability for blog posts
**Suggestion**: Add search to help visitors find content quickly

**Options**:
- **Pagefind** (recommended for static sites): Zero-config static search
  ```bash
  npm install -D pagefind
  ```
  - Runs at build time, creates a search index
  - Already has `data-pagefind-body` attributes in layout
  - Add search UI component in navbar or blog listing

- **Algolia DocSearch**: For larger content libraries
- **Simple client-side filter**: For minimal overhead (filter by title/tags)

**Implementation**:
```tsx
// src/components/BlogSearch.tsx
// Add a search input that filters posts client-side or uses Pagefind
```

### 2. Tag/Category Pages
**Current State**: Tags are captured in frontmatter but not utilized
**Suggestion**: Create tag pages at `/thoughts/tags/[tag]`

**Benefits**:
- Better content organization
- Improved discoverability
- SEO boost from topic clusters

**Implementation**:
```typescript
// src/app/thoughts/tags/[tag]/page.tsx
// Filter posts by tag, generate static params for each tag
```

### 3. Related Posts
**Suggestion**: Show 2-3 related posts at the end of each article

**Strategy**:
- Match by shared tags
- Fall back to chronological (previous/next)
- Exclude current post

## Performance

### 4. Image Optimization
**Current State**: Images may not be optimized
**Suggestion**: Ensure all images use Next.js `<Image>` component

**Checklist**:
- [ ] Replace `<img>` with `next/image`
- [ ] Add `width` and `height` to prevent CLS
- [ ] Use `sizes` prop for responsive images
- [ ] Consider WebP/AVIF formats
- [ ] Add blur placeholders for images

### 5. Bundle Analysis
**Suggestion**: Monitor bundle size and identify optimization opportunities

```json
// package.json
"scripts": {
  "analyze": "ANALYZE=true next build"
}
```

```bash
npm install -D @next/bundle-analyzer
```

**Target Metrics**:
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Total bundle size < 200KB (initial)

### 6. Preload Critical Resources
**Suggestion**: Add preload hints for fonts and critical assets

```tsx
// src/app/layout.tsx
<link
  rel="preload"
  href="/AtkinsonHyperlegibleNext-VariableFont_wght.ttf"
  as="font"
  type="font/ttf"
  crossOrigin="anonymous"
/>
```

## SEO & Discoverability

### 7. Sitemap Generation
**Current State**: No sitemap
**Suggestion**: Add `sitemap.xml` for better crawling

```typescript
// src/app/sitemap.ts
export default async function sitemap() {
  const posts = await getBlogYearsWithPosts();
  // Generate sitemap entries
}
```

### 8. Structured Data (JSON-LD)
**Suggestion**: Add Schema.org markup for rich snippets

**Target Schemas**:
- `Person` for homepage
- `BlogPosting` for articles
- `BreadcrumbList` for navigation

**Benefits**:
- Rich snippets in search results
- Better Google understanding
- Potential featured snippets

### 9. Social Preview Generator
**Suggestion**: Dynamically generate Open Graph images per post

**Options**:
- **Vercel OG Image**: Serverless image generation
- **Satori**: Generate SVG → PNG at build time
- Static template with post title overlay

### 10. robots.txt
**Suggestion**: Add explicit crawler directives

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://willmruzek.com/sitemap.xml
```

## Developer Experience

### 11. Pre-commit Hooks
**Suggestion**: Enforce quality checks before commits

```bash
npm install -D husky lint-staged
```

```json
// package.json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{md,mdx}": ["prettier --write"]
}
```

### 12. Generate JSON Schema from Zod Schemas
**Suggestion**: Use Zod schemas as source of truth for JSON Schema generation

**Current State**: JSON Schema (`content/schemas/main.json`) and Zod schema (`src/lib/schemas.ts`) are maintained separately

**Benefits**:
- Single source of truth (Zod schemas)
- Eliminates schema drift between runtime validation and static linting
- TypeScript types, runtime validation, and ESLint validation all derived from same schema

### 13. Type-safe Environment Variables
**Suggestion**: Add Zod validation for env vars

```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  ENABLE_BLOG: z.enum(['true', 'false']),
  // ...
});

export const env = envSchema.parse(process.env);
```

### 14. Storybook for Components
**Suggestion**: Document components in isolation

**Benefits**:
- Visual regression testing
- Component documentation
- Faster component development

## Content Management

### 15. Content Templates
**Suggestion**: Add MDX templates for common post types

```bash
# Create new post helper
npm run new-post "My Post Title"
# Generates: content/thoughts/2025/my-post-title.mdx with frontmatter
```

### 16. Frontmatter Autocomplete
**Suggestion**: Generate TypeScript types from JSON Schema

```bash
npm install -D json-schema-to-typescript
```

```json
"scripts": {
  "generate:types": "json2ts content/schemas/main.json > src/types/frontmatter.d.ts"
}
```

## Accessibility

### 17. Skip Navigation Link
**Suggestion**: Add skip-to-content for keyboard users

```tsx
// src/app/layout.tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### 18. Focus Indicators
**Suggestion**: Ensure all interactive elements have visible focus states

**Audit**:
- Tab through entire site
- Verify focus rings on all buttons/links
- Test with screen reader

### 19. Color Contrast Audit
**Suggestion**: Run automated contrast checks

**Tools**:
- axe DevTools browser extension
- WAVE evaluation tool
- Lighthouse accessibility score

**Target**: WCAG AA compliance (4.5:1 for normal text)

### 20. ARIA Landmarks
**Suggestion**: Add semantic landmarks for assistive tech

```tsx
<nav aria-label="Primary navigation">
<main id="main-content">
<aside aria-label="Table of contents">
```

## Analytics & Monitoring

### 21. Privacy-First Analytics
**Suggestion**: Add analytics without cookies

**Options**:
- **Plausible**: Privacy-focused, GDPR compliant
- **Fathom**: Simple, no cookies
- **Vercel Analytics**: Built-in, minimal setup

**Avoid**: Google Analytics (privacy concerns, heavy)

### 22. Web Vitals Tracking
**Suggestion**: Monitor Core Web Vitals in production

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Add to layout
<Analytics />
<SpeedInsights />
```

### 23. Error Monitoring
**Suggestion**: Track runtime errors in production

**Options**:
- **Sentry**: Comprehensive error tracking
- **Axiom**: Lightweight, log-based
- Custom error boundary with reporting

### 24. Uptime Monitoring
**Suggestion**: Get alerts if site goes down

**Free Options**:
- UptimeRobot
- Better Uptime
- Vercel deployment webhooks to Discord/Slack

## Features

### 25. Series/Multi-part Posts
**Suggestion**: Link related posts in a series

**Frontmatter**:
```yaml
series: "Building a Blog"
seriesOrder: 1
```

**Display**: Navigation to prev/next in series

### 26. Code Playground Integration
**Suggestion**: Embed live code examples

**Options**:
- **CodeSandbox**: Full-featured
- **StackBlitz**: WebContainers
- **CodePen**: Simple embeds

## Content Ideas

### 27. Now Page
**Inspired by nownownow.com**:
- `/now` page with current focus
- Update monthly
- Humanizes the site

### 28. Uses Page
**Developer community favorite**:
- `/uses` listing tools, hardware, software
- Links to affiliate products (optional revenue)
