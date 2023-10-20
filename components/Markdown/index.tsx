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
    <div className="pb-6">
      <h1 className="mt-6 text-center text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 text-center text-sm">{post.date}</p>

      <div className="markdown">
        <MDXContent components={mdxComponents} />
      </div>
    </div>
  );
};

export default Markdown;
