import clsx from "clsx";

import type React from "react";

export const Code: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    "data-language"?: string;
  }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
> = ({ children, className, "data-language": _language, ...props }) => {
  return (
    <code
      className={clsx(
        "nextra-code",
        // Baseline alignment for inline code tokens
        "x:leading-[var(--tw-baseline-unit-value-px)]",
        // If line numbers enabled, prep for counters
        "data-line-numbers" in props && "[counter-reset:line]",
        className,
      )}
      // always show code blocks in ltr
      dir="ltr"
      {...props}
    >
      {children}
    </code>
  );
};
