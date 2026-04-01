/**
 * Feature toggles for development and production
 *
 * ENABLE_BLOG: `true` to enable the blog.
 * NEXT_PUBLIC_ENABLE_BASELINE_GRID: `true` to enable baseline grid toggle.
 */

export function isBlogEnabled(): boolean {
  return process.env.ENABLE_BLOG === "true";
}

export function isBaselineGridEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_BASELINE_GRID === "true";
}
