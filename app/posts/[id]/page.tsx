import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { notFound } from "next/navigation";

import { BasicSettings } from "@/lib/setting";

import Footer from "@/components/Footer";
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
    <div className="animate-fade-up">
      <Markdown post={post} />
    </div>
  );
}
