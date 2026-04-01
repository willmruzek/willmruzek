# Tailwind Typography Baseline Demo

A comprehensive demonstration of the `prose-baseline` plugin showcasing perfect vertical rhythm across all typography elements.

## Quick Start

Simply open `index.html` in your browser:

```bash
open index.html
```

Or serve it locally with Node.js:

```bash
pnpm run serve
# Then visit: http://localhost:8080
```

## Features Demonstrated

- ✅ **24px baseline grid** - Every element aligns to perfect vertical rhythm
- ✅ **Interactive grid overlay** - Toggle button to visualize baseline alignment
- ✅ **Responsive type scales** - Demonstrates sm, base, lg, xl, and 2xl sizes
- ✅ **Comprehensive examples** - All HTML typography elements (headings, lists, code, tables, quotes, etc.)
- ✅ **Dark mode support** - Adapts to system dark mode preferences

## Using the Grid Overlay

Click the "Show Grid" button in the top right to enable the baseline grid overlay. This displays red horizontal lines every 24px, allowing you to visually verify that all text aligns to the baseline grid.

## Rebuilding CSS (Optional)

The `output.css` file is pre-built and checked into git, so you don't need to rebuild unless you modify `input.css` or update the plugin.

To rebuild:

```bash
pnpm run build
```

This will regenerate `output.css` with the latest styles.

### Development Mode

To rebuild automatically when `input.css` changes:

```bash
pnpm run dev
```

## What's Being Demonstrated

The demo includes examples of:

- **Headings** (h1-h4) with proper baseline alignment
- **Paragraphs** with consistent line height
- **Lists** (ordered, unordered, nested) maintaining rhythm
- **Code blocks** (inline and fenced) aligned to grid
- **Blockquotes** with proper spacing
- **Tables** with baseline-aligned content
- **Definition lists** (dl, dt, dd)
- **Images and figures** with captions
- **Links, emphasis, strong** text inline elements
- **Keyboard shortcuts** (kbd elements)
- **Horizontal rules** (hr elements)
