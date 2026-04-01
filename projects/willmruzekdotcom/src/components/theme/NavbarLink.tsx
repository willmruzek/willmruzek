"use client";

import { Link } from "next-view-transitions";
import { useFSRoute } from "nextra/hooks";

import type React from "react";

export function NavbarLink(props: React.ComponentProps<typeof Link>) {
  const pathname = useFSRoute();
  const isActive = props.href === pathname;

  return (
    <Link
      className="focus-visible:x:outline focus-visible:x:outline-2 focus-visible:x:outline-offset-2 focus-visible:x:outline-gray-400 x:px-1 x:py-1 x:font-medium x:text-black x:no-underline x:dark:text-gray-300 x:dark:focus-visible:outline-gray-600"
      aria-current={isActive || undefined}
      {...props}
    />
  );
}
