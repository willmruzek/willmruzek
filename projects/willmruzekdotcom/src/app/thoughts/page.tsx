import { getBlogYearsWithPosts } from "@/lib/post-utils";
import { PostListItem } from "@/components/PostListItem";

export default async function BlogIndex() {
  const postsByYear = await getBlogYearsWithPosts();

  return (
    <div className="x:mx-auto x:max-w-4xl">
      <h1 className="x:mb-[calc(var(--tw-baseline-unit-value-px)*2)] x:text-4xl x:leading-[calc(var(--tw-baseline-unit-value-px)_*_2)] x:font-bold x:text-gray-900 x:dark:text-gray-100">
        Thoughts
      </h1>
      {postsByYear.length === 0 ? (
        <p className="x:mb-[var(--tw-baseline-unit-value-px)] x:leading-[var(--tw-baseline-unit-value-px)] x:text-gray-700 x:dark:text-gray-300">
          No blog posts found.
        </p>
      ) : (
        <ul className="x:mx-auto x:w-fit x:space-y-[calc(var(--tw-baseline-unit-value-px))]">
          {postsByYear.map(({ name, children: posts }) => (
            <li key={name}>
              <h2 className="x:mb-[var(--tw-baseline-unit-value-px)] x:text-2xl x:leading-[calc(var(--tw-baseline-unit-value-px)_*_2)] x:font-semibold x:text-gray-800 x:dark:text-gray-200">
                {name}
              </h2>
              <ul className="marker:x:mr-6 marker:x:inline-block marker:x:text-gray-400 x:ml-12 x:list-disc x:space-y-[var(--tw-baseline-unit-value-px)] x:dark:marker:text-gray-500">
                {posts.map((post) => (
                  <PostListItem key={post.route} post={post} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
