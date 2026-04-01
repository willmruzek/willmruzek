"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { BaselineGridToggle } from "@/components/BaselineGridToggle";
import { isBaselineGridEnabled } from "@/lib/feature-config";
import { Meta } from "./Meta";

import type { BlogPostMetadata } from "@/lib/schemas";
import type React from "react";

export function BlogPostWrapper({
  children,
  metadata,
}: React.PropsWithChildren<{
  metadata: BlogPostMetadata;
}>) {
  const [showGrid, setShowGrid] = useState(false);

  const baselineGridEnabled = isBaselineGridEnabled();

  return (
    <article>
      {baselineGridEnabled && (
        <BaselineGridToggle showGrid={showGrid} onToggle={setShowGrid} />
      )}
      <header className="x:mb-[2em]">
        <Meta {...metadata} />
        <h1 className="x:mt-0 x:mb-0 x:text-2xl x:leading-[calc(var(--tw-baseline-unit-value-px))] x:font-extrabold x:tracking-tight x:text-balance x:text-gray-900 x:sm:text-3xl x:sm:leading-[calc(var(--tw-baseline-unit-value-px)_*_2)] x:md:text-4xl x:dark:text-gray-100">
          {metadata.title}
        </h1>
      </header>
      <div
        className={clsx(
          `x:prose-baseline x:lg:prose-baseline-lg`,
          showGrid && "x:prose-baseline-debug-grid",
        )}
      >
        {children}
      </div>
    </article>
  );
}
