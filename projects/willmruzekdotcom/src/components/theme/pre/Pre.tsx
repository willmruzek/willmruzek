import clsx from "clsx";
import { CopyToClipboard } from "./CopyToClipboard";

import type React from "react";

const classes = {
  border: clsx(
    "x:border x:border-gray-300 x:dark:border-neutral-700",
    "x:contrast-more:border-gray-900 x:contrast-more:dark:border-gray-50",
  ),
};

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-filename"?: string;
  "data-copy"?: "";
  "data-language"?: string;
  "data-word-wrap"?: "";
  "data-pagefind-ignore"?: string;
  icon?: React.ReactNode;
};

export const Pre: React.FC<PreProps> = ({
  children,
  className,
  "data-filename": filename,
  "data-copy": copy,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  "data-language": _language,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  "data-word-wrap": hasWordWrap,
  "data-pagefind-ignore": pagefindIgnore,
  icon,
  ...props
}) => {
  const copyButton = copy === "" && (
    <CopyToClipboard className={filename ? "x:ms-auto x:text-sm" : ""} />
  );

  return (
    <div
      data-pagefind-ignore={pagefindIgnore}
      className="not-prose x:mb-[var(--tw-baseline-unit-value-px)]"
    >
      {filename && (
        <div
          className={clsx(
            "x:px-[calc(var(--tw-baseline-unit-value-px)_*_0.5)] x:text-xs x:text-gray-700 x:dark:text-gray-200",
            "x:bg-gray-100 x:dark:bg-neutral-900",
            "x:flex x:h-12 x:items-center x:gap-2 x:rounded-t-md",
            classes.border,
            "x:border-b-0",
          )}
        >
          {icon}
          <span className="x:truncate">{filename}</span>
          {copyButton}
        </div>
      )}
      <pre
        className={clsx(
          "x:relative",
          "x:group",
          "x:focus-visible:nextra-focus",
          "x:py-[var(--tw-baseline-unit-value-px)]",
          "x:text-sm x:leading-[var(--tw-baseline-unit-value-px)]",
          "x:subpixel-antialiased",
          "x:overflow-x-auto",
          "x:bg-white x:dark:bg-black",
          "x:ring-1 x:ring-gray-300 x:ring-inset x:dark:ring-neutral-700",
          "x:contrast-more:ring-gray-900 x:contrast-more:dark:ring-gray-50",
          "x:contrast-more:contrast-150",
          filename ? "x:rounded-b-md" : "x:rounded-md",
          className,
        )}
        {...props}
      >
        <span
          className={clsx(
            "x:group-hover:opacity-100",
            "x:group-focus:opacity-100",
            "x:opacity-0 x:transition x:focus-within:opacity-100",
            "x:absolute x:right-[calc(var(--tw-baseline-unit-value-px)_*_0.5)] x:flex x:gap-1",
            filename
              ? "x:top-[calc(var(--tw-baseline-unit-value-px)_*_2.25)]"
              : "x:top-[calc(var(--tw-baseline-unit-value-px)_*_0.25)]",
          )}
        >
          {!filename && copyButton}
        </span>
        {children}
      </pre>
    </div>
  );
};
