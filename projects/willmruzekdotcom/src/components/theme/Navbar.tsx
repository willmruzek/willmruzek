import clsx from "clsx";
import { normalizePages } from "nextra/normalize-pages";
import { BLOG_BASE_PATH } from "@/lib/routes";
import { isBlogEnabled } from "@/lib/feature-config";
import { DarkModeToggle } from "./DarkModeToggle";
import { NavbarLink } from "./NavbarLink";

import type { PageMapItem } from "nextra";
import type React from "react";

type NavbarProps = React.PropsWithChildren<{
  pageMap: PageMapItem[];
}>;

export function Navbar({ children, pageMap }: NavbarProps) {
  const { topLevelNavbarItems } = normalizePages({ list: pageMap, route: "/" });
  const blogEnabled = isBlogEnabled();

  const filteredNavItems = topLevelNavbarItems.filter((nav) => {
    // Filter out blog-related routes when blog is disabled
    if (!blogEnabled && nav.route.startsWith(BLOG_BASE_PATH)) {
      return false;
    }

    return true;
  });

  return (
    <header
      className={clsx(
        "x:flex x:items-center x:justify-end x:gap-3",
        isBlogEnabled() ? "x:mb-18" : "x:mb-12",
      )}
      data-pagefind-ignore="all"
    >
      {blogEnabled &&
        filteredNavItems.map((nav) => (
          <NavbarLink key={nav.route} href={nav.route}>
            {nav.title}
          </NavbarLink>
        ))}
      {children}
      <DarkModeToggle />
    </header>
  );
}
