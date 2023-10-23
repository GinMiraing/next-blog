"use client";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect } from "react";

import { Post } from "@/.contentlayer/generated";

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: ({ src, alt }) => (
    <Link
      data-fancybox
      className="relative block h-60 w-full overflow-hidden sm:h-80"
      href={src as string}
      target="_blank"
    >
      <Image
        priority
        src={`${src}@900w_450h_1c.webp` as string}
        alt={alt || ""}
        layout="fill"
        className="object-cover object-center"
      />
    </Link>
  ),

  h2: ({ children }) => (
    <h2 className="my-2 text-lg font-bold underline underline-offset-4 transition-colors">
      # {children}
    </h2>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-pink pl-4">
      {children}
    </blockquote>
  ),

  sup: ({ children }) => <sup className="text-xs">[{children}]</sup>,

  p: ({ children }) => (
    <p className="my-4 text-justify text-sm/6 sm:text-base/8">{children}</p>
  ),
};

const Markdown: React.FC<{ post: Post }> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);

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
  }, []);

  return (
    <div className="pb-4 pt-4 sm:pb-2">
      <h1 className="mt-4 text-center text-xl font-bold">{post.title}</h1>
      <p className="my-6 text-center text-sm">{post.date}</p>
      <div className="markdown">
        <MDXContent components={mdxComponents} />
      </div>
    </div>
  );
};

export default Markdown;
