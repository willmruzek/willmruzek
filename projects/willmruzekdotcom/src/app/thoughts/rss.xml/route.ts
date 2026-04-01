import { getBlogYearsWithPosts, importBlogPost } from "@/lib/post-utils";
import { BLOG_BASE_PATH } from "@/lib/routes";

export async function GET() {
  // Middleware handles route blocking when blog is disabled
  const postsByYear = await getBlogYearsWithPosts();
  const siteUrl = "https://willmruzek.com";

  // Flatten all posts from all years and get their metadata
  const allPosts = postsByYear.flatMap((year) =>
    year.children.map((post) => ({
      year: year.name,
      slug: post.name,
      route: post.route,
      title: post.title || "Untitled",
    })),
  );

  const rssItems = await Promise.all(
    allPosts.map(async (post) => {
      try {
        const { metadata } = await importBlogPost({
          year: post.year,
          slug: post.slug,
        });

        const pubDate = metadata.date.toUTCString();
        const url = `${siteUrl}${post.route}`;

        return `
        <item>
          <title><![CDATA[${metadata.title}]]></title>
          <description><![CDATA[${metadata.description}]]></description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
        </item>
      `;
      } catch (error) {
        console.error(
          `Failed to load metadata for ${post.year}/${post.slug}:`,
          error,
        );
        return ""; // Skip posts that can't be loaded
      }
    }),
  );

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Will Mruzek's Blog</title>
    <description>Personal blog about technology and development</description>
    <link>${siteUrl}${BLOG_BASE_PATH}</link>
    <atom:link href="${siteUrl}${BLOG_BASE_PATH}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems.filter((item) => item.trim()).join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
