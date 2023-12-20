"use client";

import { Fancybox } from "@fancyapps/ui";
import { useWindowScroll } from "@uidotdev/usehooks";
import { ChevronUp } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => (
    <Link
      className="text-pink underline-offset-4 hover:underline"
      href={href as string}
    >
      {children}
    </Link>
  ),
  img: ({ src, alt }) => (
    <Link
      data-fancybox
      className="relative block h-60 w-full overflow-hidden rounded bg-gray-50 transition-all hover:brightness-75 sm:h-80"
      href={src as string}
    >
      <Image
        priority
        src={`${src}/post_thumb` as string}
        alt={alt || ""}
        layout="fill"
        className="object-cover object-center"
      />
    </Link>
  ),

  h2: ({ children }) => (
    <h2 className="my-2 inline-block rounded bg-red-100 px-1.5 font-medium text-lg">
      {children}
    </h2>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-pink pl-4">
      {children}
    </blockquote>
  ),

  sup: ({ children }) => <sup className="text-xs">[{children}]</sup>,

  p: ({ children }) => (
    <p className="my-4 text-justify text-sm/8 sm:text-base/8">{children}</p>
  ),
};

const Markdown: React.FC<{ source: MDXRemoteSerializeResult }> = ({
  source,
}) => {
  const [{ x, y }, scrollTo] = useWindowScroll();

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      groupAll: true,
      Thumbs: false,
      Carousel: {
        transition: "slide",
      },
      Images: {
        zoom: false,
      },
      showClass: "f-fadeSlowIn",
      hideClass: "f-fadeSlowOut",
      wheel: "slide",
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"],
        },
      },
    });

    return () => {
      Fancybox.unbind("[data-fancybox]");
      Fancybox.close();
    };
  }, []);

  return (
    <>
      <div className="markdown">
        <MDXRemote
          {...source}
          components={mdxComponents}
        />
      </div>
      <button
        title="返回顶部"
        aria-label="返回顶部"
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-md bg-pink text-white shadow transition-opacity sm:bottom-24 sm:right-4 sm:h-12 sm:w-12",
          {
            "opacity-100": y && y > 200,
            "pointer-events-none opacity-0": !y || y < 200,
          },
        )}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  );
};

export default Markdown;
