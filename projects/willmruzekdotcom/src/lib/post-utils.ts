import { getPageMap } from "nextra/page-map";
import { normalizePages } from "nextra/normalize-pages";
import { importPage } from "nextra/pages";
import { type Metadata } from "next";
import { BlogPostMetadataSchema } from "@/lib/schemas";
import { BLOG_BASE_PATH, createPostUrl } from "@/lib/routes";

type BlogPostParams = { year: string; slug: string };

/**
 * Imports a blog post using Nextra's importPage with the correct path.
 * Validates frontmatter using Zod schema to ensure type safety.
 *
 * @param params - The year and slug of the post
 * @returns The imported page with MDX content, validated metadata, and TOC
 * @throws {ZodError} If frontmatter validation fails
 */
export async function importBlogPost(params: BlogPostParams) {
  const page = await importPage([
    BLOG_BASE_PATH.slice(1),
    params.year,
    params.slug,
  ]);

  // Validate and parse the metadata
  const metadata = BlogPostMetadataSchema.parse(page.metadata, {
    error: (issue) => {
      const path = issue.path?.join(".") || "<unknown>";
      return `Invalid frontmatter in post ${params.year}/${params.slug} - ${path}: ${issue.message}`;
    },
  });

  return {
    ...page,
    metadata,
  };
}

/**
 * Loads the blog year directories with their child posts, filtered and sorted for display.
 * Filters out:
 * - Directories starting with underscore (e.g., _dev) in production
 *
 * @returns Year directories, each containing their posts, sorted by year (newest first)
 */
export async function getBlogYearsWithPosts() {
  const pageMap = await getPageMap(BLOG_BASE_PATH);
  const { directories } = normalizePages({
    list: pageMap,
    route: BLOG_BASE_PATH,
  });

  const isProduction = process.env.NODE_ENV === "production";
  return directories
    .filter(
      (dir) =>
        dir.name !== "index" &&
        (isProduction ? !dir.name.startsWith("_") : true),
    )
    .sort((a, b) => b.route.localeCompare(a.route));
}

/**
 * Builds Next.js metadata for a blog post page.
 * Generate OpenGraph and Twitter card from frontmatter metadata.
 *
 * @param params - The year and slug identifying the post
 * @returns Metadata with title, description, OpenGraph, and Twitter card data
 */
export async function buildPostMetadata(
  params: BlogPostParams,
): Promise<Metadata> {
  const { metadata } = await importBlogPost(params);

  const articleTime = metadata.date.toISOString();
  const postUrl = createPostUrl(params);
  const ogImage =
    metadata.image ?? `/og/thoughts/${params.year}/${params.slug}.png`;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      type: "article",
      title: metadata.title,
      description: metadata.description,
      url: postUrl,
      publishedTime: articleTime,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}
