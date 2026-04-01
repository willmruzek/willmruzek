"use client";

import { useState } from "react";
import clsx from "clsx";
import { BaselineGridToggle } from "@/components/BaselineGridToggle";
import { isBaselineGridEnabled } from "@/lib/feature-config";

import type { $NextraMetadata } from "nextra";
import type React from "react";

type Props = React.PropsWithChildren<{ metadata: $NextraMetadata }>;

export function IndexWrapper({ children, metadata }: Props) {
  const [showGrid, setShowGrid] = useState(false);

  const baselineGridEnabled = isBaselineGridEnabled();

  return (
    <div>
      {baselineGridEnabled && (
        <BaselineGridToggle showGrid={showGrid} onToggle={setShowGrid} />
      )}
      <h1 className="x:mb-12 x:text-5xl x:leading-[4.5rem] x:font-extrabold x:tracking-tight x:text-balance x:text-gray-900 x:sm:text-6xl x:dark:text-gray-100">
        {metadata.title}
      </h1>
      <div
        className={clsx(
          `x:index-page-baseline x:prose-baseline x:lg:prose-baseline-lg`,
          showGrid && "x:prose-baseline-debug-grid",
        )}
      >
        {children}
      </div>
    </div>
  );
}
