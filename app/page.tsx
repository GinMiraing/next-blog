import { getPosts } from "@/lib/backend";

import Pagination from "@/components/Pagination";
import Postcard from "@/components/Postcard";

export const revalidate = 60 * 30;

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const page = searchParams.page || "1";
  const limit = searchParams.limit || "7";

  if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
    throw new Error("查询参数错误");
  }

  const data = await getPosts({
    limit: parseInt(limit),
    page: parseInt(page),
  });

  const totalPage = Math.ceil(data.total / parseInt(limit));

  const posts = data.posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    date: post.create_at,
    category: post.category,
  }));

  if (posts.length === 0) {
    throw new Error("未找到任何文章");
  }

  return (
    <div
      key={page}
      className="min-h-[calc(100vh-10rem)] animate-fade py-6"
    >
      <div className="divide-y divide-dashed divide-slate-300">
        {posts.map((post) => (
          <Postcard
            key={post.id}
            post={post}
          />
        ))}
      </div>
      <Pagination
        currentPage={parseInt(page)}
        totalPage={totalPage}
      />
    </div>
  );
}
