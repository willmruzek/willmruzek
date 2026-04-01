import { Fragment } from "react";

import type React from "react";
import type { BlogPostMetadata } from "@/lib/schemas";

const formatDate = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return {
    iso: date.toISOString(),
    label: `${year} ${month} ${day}`.trim(),
  } as const;
};

export const Meta: React.FC<BlogPostMetadata> = ({
  author,
  date,
  readingTime,
}) => {
  const readingTimeText = readingTime?.text;
  const formattedDate = formatDate(date);

  const items = (
    [
      author
        ? {
            key: "author",
            node: (
              <span className="x:font-bold x:text-gray-900 x:dark:text-gray-100">
                {author}
              </span>
            ),
          }
        : null,
      formattedDate
        ? {
            key: "date",
            node: (
              <time
                dateTime={formattedDate.iso}
                className="x:font-medium x:text-gray-700 x:dark:text-gray-300"
              >
                {formattedDate.label}
              </time>
            ),
          }
        : null,
      readingTimeText
        ? {
            key: "reading-time",
            node: (
              <span className="x:font-medium x:text-gray-700 x:dark:text-gray-300">
                {readingTimeText}
              </span>
            ),
          }
        : null,
    ] as const
  ).filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="x:flex x:flex-wrap x:items-center x:gap-x-6 x:text-base x:leading-[var(--tw-baseline-unit-value-px)] x:font-medium">
      {items.map(({ key, node }, index) => (
        <Fragment key={key}>
          {index > 0 && (
            <span
              aria-hidden="true"
              className="x:h-2 x:w-2 x:rounded-full x:bg-gray-400 x:dark:bg-gray-600"
            />
          )}
          {node}
        </Fragment>
      ))}
    </div>
  );
};
