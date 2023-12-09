import Link from "next/link";

import CategoryChoose from "@/components/CategoryChoose";

import { allPosts } from "@/.contentlayer/generated";

export const revalidate = 60;

export default function Page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const sortedPosts = allPosts
    .sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    })
    .filter((post) => {
      return category ? post.category === category : true;
    });

  if (sortedPosts.length === 0) {
    throw new Error("未找到任何文章");
  }

  return (
    <div
      key={category}
      className="min-h-[calc(100vh-10rem)] animate-fade space-y-6 py-6"
    >
      <CategoryChoose crurentCategory={category} />
      <div className="divide-y divide-dashed divide-slate-300">
        {sortedPosts.map((post) => (
          <div
            key={post._raw.flattenedPath}
            className="flex items-center justify-between py-4"
          >
            <Link
              href={post.url}
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
