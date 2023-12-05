import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { notFound } from "next/navigation";

import { BasicSettings } from "@/lib/setting";

import Markdown from "@/components/Markdown";

import { allPosts } from "@/.contentlayer/generated";

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
      <div className="animate-fade">
        <Markdown post={post} />
      </div>
    </div>
  );
}
