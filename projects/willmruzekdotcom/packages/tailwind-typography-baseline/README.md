# Tailwind CSS Typography Baseline Plugin

A baseline grid system for Tailwind CSS v4 that ensures consistent vertical rhythm.

It follows in the footsteps of `@tailwindcss/typography`.

## Features

- ✅ **Baseline Grid System**: Perfect vertical rhythm (24px default spacing)
- ✅ **Tailwind Typography API**: Same class names and type scales (sm, base, lg, xl, 2xl)
- ✅ **Complete HTML Support**: Comprehensive styling for all major elements
- ✅ **CSS Variable Theming**: Easy customization with light/dark mode support
- ✅ **Development Tools**: Visual baseline overlay and debug utilities

## Demo

Check out the [live demo](demo/index.html) with comprehensive examples of all typographic elements. The demo includes:

- Interactive baseline grid overlay toggle
- Responsive type scaling
- All supported HTML elements
- Dark mode support

The demo is pre-built and ready to view - just open `demo/index.html` in your browser!

To rebuild the demo CSS (optional):

```bash
cd demo
pnpm run build
```

## Installation

This package is not yet published to NPM. Install directly from GitHub for now:

```bash
npm install github:willmruzek/tailwind-baseline-baseline
```

Then import in your main CSS file:

```css
@import "tailwindcss";
@import "tailwind-typography-baseline/baseline-grid.css";
```

## Usage

### Basic Usage

The plugin follows a similar class API to `@tailwindcss/typography`:

**Two main usage patterns:**

1. **Simple**: `prose-baseline` (16px default)
2. **Responsive**: `prose-baseline prose-baseline-sm sm:prose-baseline-base lg:prose-baseline-lg xl:prose-baseline-xl 2xl:prose-baseline-2xl`

```html
<!-- Base class with default 16px scale -->
<article class="prose-baseline">
  <h1>Your content here</h1>
  <p>Perfect baseline alignment...</p>
</article>
```

### Type Scales

Use size modifiers with the base:

```html
<!-- Small scale (14px base) -->
<article class="prose-baseline prose-baseline-sm">...</article>

<!-- Default scale (16px base) -->
<article class="prose-baseline">...</article>

<!-- Explicit base (16px base) - Same as default -->
<article class="prose-baseline prose-baseline-base">...</article>

<!-- Large scale (18px base) -->
<article class="prose-baseline prose-baseline-lg">...</article>

<!-- Extra large scale (20px base) -->
<article class="prose-baseline prose-baseline-xl">...</article>

<!-- 2X large scale (24px base) -->
<article class="prose-baseline prose-baseline-2xl">...</article>

<!-- Responsive design pattern -->
<article
  class="prose-baseline prose-baseline-sm sm:prose-baseline-base lg:prose-baseline-lg xl:prose-baseline-xl 2xl:prose-baseline-2xl"
>
  <!-- Scales from 14px → 16px → 18px → 20px → 24px across breakpoints -->
</article>
```

### Responsive Design

Combine with Tailwind's breakpoint modifiers:

```html
<article class="prose-baseline md:prose-baseline-lg lg:prose-baseline-xl">
  <!-- Scales from 16px → 18px → 20px across breakpoints -->
</article>
```

### Development Grid Overlay

Enable visual baseline grid in development:

```html
<article class="prose-baseline prose-baseline-debug-grid">
  <!-- Shows red grid lines every 24px for alignment debugging -->
</article>
```

## Available Classes

### Base Class

- `prose-baseline` - Base typography with 16px font size and 24px line height

### Type Scale Modifiers

- `prose-baseline-sm` - 14px base (0.875rem)
- `prose-baseline-base` - 16px base (1rem) - explicit base class
- `prose-baseline-lg` - 18px base (1.125rem)
- `prose-baseline-xl` - 20px base (1.25rem)
- `prose-baseline-2xl` - 24px base (1.5rem)

### Development Tools

- `prose-baseline-debug-grid` - Visual baseline grid overlay for development

## Dynamic Prefix Support

Works with any Tailwind CSS v4 prefix configuration:

```css
/* With prefix 'x' */
@import "tailwindcss" prefix(x) source(none);
```

```html
<!-- Classes automatically get the prefix -->
<div class="x:prose-baseline x:prose-baseline-lg">...</div>
```

## Baseline Grid System

The plugin uses a **24px baseline unit** that ensures perfect vertical rhythm:

- **Line Heights**: All text elements align to 24px increments
- **Spacing**: Margins and padding follow 24px multiples
- **Headings**: Precisely positioned to maintain grid alignment
- **Elements**: Tables, lists, blockquotes, and code blocks all respect the baseline

## Typography Elements

The plugin provides comprehensive styling for:

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `p`
- `code`, `pre`
- `blockquote`
- `strong`, `b`, `em`, `i`
- `ul`, `ol`, `li`
- `dl`, `dt`, `dd`
- `table`, `thead`, `tbody`, `tfoot`, `th`, `td`, `caption`
- `a`
- `details`, `summary`
- `img` ⚠️ _Exception: Currently adheres to aspect ratio only, baseline alignment is complex and will be tackled later_
- `figure`, `figcaption`

## Customization

List items (`li`) have no bottom margin by default to avoid extra spacing between items. Apply custom spacing in your own styles when needed.

Override these CSS variables to customize the baseline grid:

### Core Baseline System

```css
@layer base {
  :root {
    /* Main baseline unit - everything scales from this */
    --tw-baseline-unit: 24; /* Default: 24px baseline grid */
  }
}
```

### Color Theme Variables

```css
@layer base {
  :root {
    /* Text colors */
    --tw-baseline-text-primary: #111827;
    --tw-baseline-text-secondary: #374151;

    /* Border and background colors */
    --tw-baseline-border-subtle: #e5e7eb;
    --tw-baseline-bg-elevated: #f9fafb;
  }

  /* Dark theme override */
  @media (prefers-color-scheme: dark) {
    :root {
      --tw-baseline-text-primary: #f9fafb;
      --tw-baseline-text-secondary: #d1d5db;
      --tw-baseline-border-subtle: #374151;
      --tw-baseline-bg-elevated: #1f2937;
    }
  }
}
```

## Using Variables Outside prose-baseline

The plugin exposes CSS variables that you can use to align elements outside of `prose-baseline` containers to the same baseline grid.

### Available Public Variables

```css
/* Core baseline calculations */
--tw-baseline-unit-value-px  /* 24px by default */

/* Color variables */
--tw-baseline-text-primary
--tw-baseline-text-secondary
--tw-baseline-border-subtle
--tw-baseline-bg-elevated
```

### Example: Blog Post Header

```tsx
// Align blog post title to baseline grid outside prose-baseline
<h1 className="text-2xl leading-[calc(var(--tw-baseline-unit-value-px))] sm:text-3xl sm:leading-[calc(var(--tw-baseline-unit-value-px)_*_2)] md:text-4xl">
  {title}
</h1>
```

This ensures consistent baseline alignment and theming across your entire application, not just within `prose-baseline` containers.

---

**Perfect typography starts with a solid foundation. Build on the baseline grid.** ⚡️
