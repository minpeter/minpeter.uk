"use client";

import { Backlink } from "./link";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { cn } from "@/lib/utils";

type HeaderProps = {
  title?: string;
  description?: string;
  link?: {
    href: string;
    text: string;
  };
};

export default function Header({ title, description, link }: HeaderProps) {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <header className="mb-10 space-y-1" data-animate>
      {link ? (
        <div>
          <Backlink text={link.text} href={link.href} />
        </div>
      ) : (
        <div className="invisible">.</div>
      )}
      <div className="flex flex-row justify-between">
        <h1 className="text-bold flex flex-wrap items-center break-all">
          {title || "minpeter"}
        </h1>

        <div className="flex space-x-1">
          <button
            className={cn(
              "hover:bg-secondary/100 animation:enter w-fit rounded-md px-0.5 text-sm text-gray-400 underline",
              {
                "text-primary": locale === "ko",
              }
            )}
            onClick={() => changeLocale("ko")}
          >
            Korean
          </button>
          <button
            className={cn(
              "hover:bg-secondary/100 animation:enter w-fit rounded-md px-0.5 text-sm text-gray-400 underline",
              {
                "text-primary": locale === "en",
              }
            )}
            onClick={() => changeLocale("en")}
          >
            English
          </button>
        </div>
      </div>
      {description && (
        <p className="w-full text-sm text-gray-400">{description}</p>
      )}
    </header>
  );
}
