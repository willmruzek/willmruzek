"use client";

import { useEffect, useState } from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import clsx from "clsx";

import type { ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import type React from "react";

const classes = {
  border: clsx(
    "x:border x:border-gray-300 x:dark:border-neutral-700",
    "x:contrast-more:border-gray-900 x:contrast-more:dark:border-gray-50",
  ),
};

function CheckIcon({
  height,
  className,
}: {
  height: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={height}
    >
      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
    </svg>
  );
}

function CopyIcon({
  height,
  className,
}: {
  height: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      height={height}
      className={className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" />
    </svg>
  );
}

type ButtonProps = HeadlessButtonProps & {
  variant?: "outline" | "default";
};

const Button = ({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <HeadlessButton
      className={(args) =>
        clsx(
          "x:cursor-pointer x:transition",
          args.focus && "x:nextra-focus",
          variant === "outline" && [classes.border, "x:rounded-md x:p-1.5"],
          typeof className === "function" ? className(args) : className,
        )
      }
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};

function useCopy({
  timeout = 2000,
}: {
  /** @default 2000 */
  timeout?: number;
} = {}) {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timerId = setTimeout(() => {
      setCopied(false);
    }, timeout);

    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]); // eslint-disable-line react-hooks/exhaustive-deps -- ignore timeout

  async function copy(content: string) {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      console.error("Failed to copy!");
    }
  }

  return {
    copy,
    isCopied,
  };
}

export const CopyToClipboard: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { copy, isCopied } = useCopy();

  const handleClick = async (event: React.MouseEvent) => {
    const container = event.currentTarget.parentNode!.parentNode!;
    const content = container.querySelector("pre code")?.textContent || "";
    copy(content);
  };

  const IconToUse = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      onClick={handleClick}
      title="Copy code"
      variant="outline"
      {...props}
    >
      <IconToUse height="1em" className="nextra-copy-icon" />
    </Button>
  );
};
