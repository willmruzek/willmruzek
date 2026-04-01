import Link from "next/link";
import { formatDateForDisplay } from "@/lib/blog-utils";

import type React from "react";

type PostListItemProps = {
  post: {
    route: string;
    title: React.ReactNode;
    frontMatter: {
      date?: string;
    };
  };
};

export function PostListItem({ post }: PostListItemProps) {
  return (
    <li className="x:leading-[var(--tw-baseline-unit-value-px)]">
      <div className="x:flex x:items-baseline x:gap-4">
        <Link
          href={post.route}
          className="x:text-lg x:text-black x:no-underline x:transition-colors x:hover:text-gray-700 x:dark:text-white x:dark:hover:text-gray-300"
        >
          {post.title}
        </Link>
        <span className="x:text-sm x:text-gray-500 x:dark:text-gray-400">
          <time dateTime={post.frontMatter.date}>
            {post.frontMatter.date &&
              formatDateForDisplay(post.frontMatter.date)}
          </time>
        </span>
      </div>
    </li>
  );
}
