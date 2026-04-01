import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildPostMetadata,
  getBlogYearsWithPosts,
  importBlogPost,
} from "@/lib/post-utils";
import { BlogPostWrapper } from "@/components/theme/BlogPostWrapper";
import { isBlogEnabled } from "@/lib/feature-config";

export async function generateStaticParams() {
  if (!isBlogEnabled()) {
    return [];
  }

  const dirs = await getBlogYearsWithPosts();
  return dirs.flatMap((dir) =>
    dir.children.map((child) => ({ year: dir.name, slug: child.name })),
  );
}

export async function generateMetadata(
  props: PageProps<"/thoughts/[year]/[slug]">,
): Promise<Metadata> {
  return buildPostMetadata(await props.params);
}

export default async function Page(
  props: PageProps<"/thoughts/[year]/[slug]">,
) {
  const params = await props.params;

  try {
    const { default: MDXContent, metadata } = await importBlogPost(params);

    return (
      <BlogPostWrapper metadata={metadata}>
        <MDXContent {...props} params={params} />
      </BlogPostWrapper>
    );
  } catch (error) {
    console.error(
      `Failed to load blog post: /${params.year}/${params.slug}`,
      error,
    );

    notFound();
  }
}
