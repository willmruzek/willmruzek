"use client";

import { useEffect, useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import clsx from "clsx";
import Markdown from "react-markdown";

export const AskSiteChat: React.FC = () => {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isStreaming = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;

  // Open the panel when the first message arrives
  const hasOpenedOnce = useRef(false);
  useEffect(() => {
    if (hasMessages && !hasOpenedOnce.current) {
      hasOpenedOnce.current = true;
      setIsOpen(true);
    }
  }, [hasMessages]);

  // Scroll to the bottom as new content streams in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleClose() {
    setIsOpen(false);
    inputRef.current?.blur();
  }

  return (
    <div className="x:pointer-events-none x:fixed x:inset-x-0 x:bottom-0 x:z-50 x:flex x:flex-col x:items-center x:print:hidden">
      {/* Message panel — kept mounted once messages appear so exit animation plays */}
      {hasMessages && (
        <div
          className={clsx(
            "x:mb-3 x:w-full x:max-w-[65ch] x:px-4",
            "x:transition-all x:duration-200 x:ease-out",
            isOpen
              ? "x:pointer-events-auto x:translate-y-0 x:opacity-100"
              : "x:pointer-events-none x:translate-y-2 x:opacity-0",
          )}
        >
          <div className="x:flex x:max-h-[50vh] x:flex-col x:rounded-3xl x:border x:border-neutral-200 x:bg-white/90 x:shadow-sm x:backdrop-blur-sm x:dark:border-zinc-700 x:dark:bg-zinc-900/50">
            {/* Panel header */}
            <div className="x:flex x:shrink-0 x:items-center x:justify-end x:px-4 x:pt-3">
              <button
                onClick={handleClose}
                aria-label="Close chat"
                className="x:text-lg x:leading-none x:text-zinc-400 x:transition-colors x:hover:text-zinc-600 x:dark:text-zinc-500 x:dark:hover:text-zinc-200"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="x:flex-1 x:space-y-4 x:overflow-y-auto x:px-4 x:py-3 x:text-sm">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "x:flex x:justify-end"
                      : "x:flex x:justify-start"
                  }
                >
                  <div
                    className={
                      message.role === "user"
                        ? "x:max-w-[80%] x:rounded-2xl x:rounded-br-sm x:bg-zinc-100 x:px-3 x:py-2 x:text-zinc-900 x:dark:bg-zinc-800 x:dark:text-zinc-100"
                        : "x:max-w-[90%] x:prose x:prose-sm x:text-zinc-800 x:dark:prose-invert x:dark:text-zinc-200"
                    }
                  >
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        console.debug("[AskSiteChat] raw message:", part.text);
                        return message.role === "user" ? (
                          <p
                            key={`${message.id}-${i}`}
                            className="x:leading-relaxed x:whitespace-pre-wrap"
                          >
                            {part.text}
                          </p>
                        ) : (
                          <Markdown key={`${message.id}-${i}`}>
                            {part.text}
                          </Markdown>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}

              {isStreaming && (
                <div className="x:flex x:items-center x:gap-1 x:text-zinc-400 x:dark:text-zinc-500">
                  <span className="x:animate-pulse">●</span>
                  <span className="x:animate-pulse x:[animation-delay:150ms]">
                    ●
                  </span>
                  <span className="x:animate-pulse x:[animation-delay:300ms]">
                    ●
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* Floating input bar */}
      <div className="x:pointer-events-auto x:w-full x:max-w-[65ch] x:px-4 x:pt-0 x:pb-6">
        <form onSubmit={handleSubmit} className="x:flex x:items-center x:gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Will Mruzek…"
            onFocus={() => {
              if (hasMessages) setIsOpen(true);
            }}
            disabled={isStreaming}
            className="x:flex-1 x:rounded-full x:border x:border-neutral-200 x:bg-white x:px-5 x:py-3.5 x:text-base x:text-zinc-900 x:placeholder-zinc-400 x:shadow-sm x:transition-colors x:outline-none x:focus:border-zinc-300 x:disabled:bg-zinc-100 x:disabled:text-zinc-400 x:disabled:placeholder-zinc-300 x:dark:border-zinc-700 x:dark:bg-zinc-900/90 x:dark:text-zinc-100 x:dark:placeholder-zinc-500 x:dark:focus:border-zinc-500 x:dark:disabled:bg-zinc-800 x:dark:disabled:text-zinc-500 x:dark:disabled:placeholder-zinc-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            aria-label="Send"
            className="x:flex x:h-11 x:w-11 x:shrink-0 x:items-center x:justify-center x:rounded-full x:bg-zinc-900 x:text-white x:shadow-xl x:transition-colors x:hover:bg-zinc-700 x:disabled:bg-zinc-200 x:disabled:text-zinc-400 x:dark:bg-zinc-100 x:dark:text-zinc-900 x:dark:hover:bg-zinc-300 x:dark:disabled:bg-zinc-700 x:dark:disabled:text-zinc-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="x:h-5 x:w-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04L10.75 5.612V16.25A.75.75 0 0 1 10 17Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
        <p className="x:mt-3 x:text-center x:text-xs x:text-zinc-400 x:dark:text-zinc-500">
          Powered by AI. Responses may not be accurate.
        </p>
      </div>
    </div>
  );
};
