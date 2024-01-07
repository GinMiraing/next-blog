import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { getPosts } from "@/lib/server";
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

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
          <Loader2 className="mr-2 animate-spin text-pink" />
          加载中...
        </div>
      }
    >
      <StreamPage category={category} />
    </Suspense>
  );
}

const StreamPage: React.FC<{
  category?: string;
}> = async ({ category }) => {
  const { posts } = getPosts({
    limit: 100,
    page: 1,
    category,
  });

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-6">
        <h1 className="text-2xl">加载失败，请刷新重试</h1>
      </div>
    );
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
      <div className="text-center">下面没有内容啦...</div>
    </div>
  );
};
