import { Metadata } from "next";
import Link from "next/link";

import { getPosts } from "@/lib/backend";
import { BasicSettings } from "@/lib/setting";

import CategoryChoose from "@/components/CategoryChoose";

export const revalidate = 60 * 30;

export const metadata: Metadata = {
  title: `${BasicSettings.name} - 分类`,
  description: `${BasicSettings.description}`,
};

export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const data = await getPosts({
    limit: 100,
    page: 1,
    category,
  });

  const posts = data.posts.map((post) => ({
    id: post.id,
    title: post.title,
    date: post.create_at,
  }));

  if (posts.length === 0) {
    throw new Error("未找到任何文章");
  }

  return (
    <div
      key={category}
      className="min-h-[calc(100vh-10rem)] animate-fade space-y-6 py-6"
    >
      <CategoryChoose crurentCategory={category} />
      <div className="divide-y divide-dashed divide-slate-300">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between py-4"
          >
            <Link
              href={`/posts/${post.id}`}
              className="truncate transition-colors hover:text-pink"
            >
              {post.title}
            </Link>
            <data className="ml-8 shrink-0">{post.date}</data>
          </div>
        ))}
      </div>
      <div className="text-center">下面没有内容啦！！！</div>
    </div>
  );
}
