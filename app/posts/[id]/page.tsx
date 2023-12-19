import axios from "axios";
import { Loader2, Tag } from "lucide-react";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import rehypeShiki from "rehype-shiki";
import remarkGfm from "remark-gfm";

import { getPostById } from "@/lib/backend";
import { BasicSettings } from "@/lib/setting";

const Markdown = dynamic(() => import("@/components/Markdown"));
const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60;

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

const StreamPage: React.FC<{
  id: string;
}> = async ({ id }) => {
  const post = await getPostById(parseInt(id));

  if (!post) {
    notFound();
  }

  const mdres = await axios.get(`${post.sourceUrl}.mdx`, {
    headers: {
      "Content-Type": "text/markdown",
    },
  });

  const mdxSource = await serialize(mdres.data, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeShiki, { theme: "monokai" }]],
      format: "mdx",
    },
  });

  return (
    <div className="min-h-[calc(100vh-10rem)] py-6">
      <div className="animate-fade space-y-6">
        <h1 className="text-center font-medium text-2xl">{post.title}</h1>
        <p className="text-center text-sm">{post.date}</p>
        {post && <Markdown source={mdxSource} />}
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>{post.category}</span>
        </div>
        <Comments />
      </div>
    </div>
  );
};
