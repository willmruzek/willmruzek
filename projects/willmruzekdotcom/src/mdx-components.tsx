import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
import type React from "react";
import { Code } from "./components/theme/Code";
import { Pre } from "./components/theme/pre";

const themeComponents = getThemeComponents();

export function useMDXComponents(components: object = {}) {
  return {
    a: themeComponents.a,
    img: themeComponents.img,
    h2: themeComponents.h2,
    h3: themeComponents.h3,
    h4: themeComponents.h4,
    h5: themeComponents.h5,
    h6: themeComponents.h6,
    code: Code,
    pre: Pre,

    // details: themeComponents.details,
    // summary: themeComponents.summary,
    // table: themeComponents.table,
    // td: themeComponents.td,
    // th: themeComponents.th,
    // tr: themeComponents.tr,

    // blockquote: themeComponents.blockquote,

    strong: (props: React.ComponentProps<"strong">) => (
      <strong className="x:font-medium" {...props} />
    ),

    b: (props: React.ComponentProps<"b">) => (
      <strong className="x:font-medium" {...props} />
    ),

    ...components,
  };
}
