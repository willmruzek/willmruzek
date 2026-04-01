/**
 * Base path for blog posts in the application.
 * Used for routing, content loading, and URL generation.
 */
export const BLOG_BASE_PATH = "/thoughts";

/**
 * Creates the URL for a blog post.
 *
 * @param params - The year and slug of the post
 * @returns URL in the format "/thoughts/year/slug"
 */
export function createPostUrl(
  params: Awaited<PageProps<"/thoughts/[year]/[slug]">["params"]>,
): string {
  return `${BLOG_BASE_PATH}/${params.year}/${params.slug}`;
}
