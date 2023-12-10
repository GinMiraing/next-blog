import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Tag } from "lucide-react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { BasicSettings } from "@/lib/setting";

import { allPosts } from "@/.contentlayer/generated";

const Markdown = dynamic(() => import("@/components/Markdown"));
const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = allPosts.find((post) => post._raw.flattenedPath === id);

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

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = allPosts.find((post) => post._raw.flattenedPath === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] py-6">
      <div className="animate-fade space-y-6">
        <h1 className="text-center font-medium text-2xl">{post.title}</h1>
        <p className="text-center text-sm">{post.date}</p>
        {post && <Markdown post={post} />}
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>{post.category}</span>
        </div>
        <Comments />
      </div>
    </div>
  );
}
