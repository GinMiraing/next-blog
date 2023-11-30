import { Suspense } from "react";

import Pagination from "@/components/Pagination";
import Postcard from "@/components/Postcard";

import { allPosts } from "@/.contentlayer/generated";

export const revalidate = 60;

const sortedPosts = allPosts.sort((a, b) => {
  return a.id < b.id ? 1 : -1;
});

const postsLength = sortedPosts.length;

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page || "1";

  if (isNaN(parseInt(page))) {
    throw new Error("Invalid page");
  }

  const totalPage = Math.ceil(postsLength / 7);
  const intPage = parseInt(page);
  const list = sortedPosts.slice(intPage * 7 - 7, intPage * 7);

  return (
    <>
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
    </>
  );
}
