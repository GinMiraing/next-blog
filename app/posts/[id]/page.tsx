import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Loader2, Tag } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { getPostById } from "@/lib/server";
import { BasicSettings } from "@/lib/setting";

import Markdown from "@/components/Markdown";

const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60 * 30;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(parseInt(id));

  if (!post) {
    return {
      title: "404",
      description: "页面不存在",
    };
  }

  return {
    title: `${BasicSettings.name} - ${post.title}`,
    description: post.description,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
          <Loader2 className="mr-2 animate-spin text-pink" />
          加载中...
        </div>
      }
    >
      <StreamPage id={id} />
    </Suspense>
  );
}

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

const StreamPage: React.FC<{
  id: string;
}> = async ({ id }) => {
  const post = getPostById(parseInt(id));

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="min-h-[calc(100vh-10rem)] py-6">
      <div className="animate-fade space-y-6">
        <h1 className="text-center font-medium text-2xl">{post.title}</h1>
        <p className="text-center text-sm">{post.date}</p>
        <Markdown>
          <div className="markdown">
            <MDXContent components={mdxComponents} />
          </div>
        </Markdown>
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span className="text-sm">{post.category}</span>
        </div>
        <Comments />
      </div>
    </div>
  );
};
