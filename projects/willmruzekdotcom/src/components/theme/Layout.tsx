import clsx from "clsx";
import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";
import { isBlogEnabled } from "@/lib/feature-config";

import type React from "react";

export const Footer: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <small className="x:mt-30 x:block" data-pagefind-ignore="all">
      {children}
    </small>
  );
};

export const Layout: React.FC<{
  children: React.ReactNode;
  nextThemes?: Omit<React.ComponentProps<typeof ThemeProvider>, "children">;
  banner?: React.ReactNode;
}> = ({ children, nextThemes, banner }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      enableColorScheme={true}
      {...nextThemes}
    >
      {banner}
      <div
        className={clsx(
          "x:mx-auto x:max-w-[65ch] x:px-4 x:pb-32 x:[&_img]:mx-auto",
          isBlogEnabled() ? "x:pt-20" : "x:pt-12",
        )}
        dir="ltr"
        data-pagefind-body
      >
        <ViewTransitions>{children}</ViewTransitions>
      </div>
    </ThemeProvider>
  );
};
