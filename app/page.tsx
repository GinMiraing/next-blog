import Pagination from "@/components/Pagination";
import Postcard from "@/components/Postcard";

import { allPosts } from "@/.contentlayer/generated";

export const revalidate = 60;

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page || "1";

  if (isNaN(parseInt(page))) {
    throw new Error("查询参数错误");
  }

  const intPage = parseInt(page);

  const sortedPosts = allPosts.sort((a, b) => {
    return a.id < b.id ? 1 : -1;
  });

  if (sortedPosts.length === 0) {
    throw new Error("未找到任何文章");
  }

  const list = sortedPosts.slice(intPage * 7 - 7, intPage * 7);

  const totalPage = Math.ceil(sortedPosts.length / 7);

  return (
    <div
      key={page}
      className="min-h-[calc(100vh-10rem)] animate-fade py-6"
    >
      <div className="divide-y divide-dashed divide-slate-300">
        {list.map((post) => (
          <Postcard
            key={post._raw.flattenedPath}
            post={post}
          />
        ))}
      </div>
      <Pagination
        currentPage={intPage}
        totalPage={totalPage}
      />
    </div>
  );
}
