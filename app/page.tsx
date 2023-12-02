import { Menu, MenuTrigger } from "@/components/Menu";
import Pagination from "@/components/Pagination";
import Postcard from "@/components/Postcard";

import { allPosts } from "@/.contentlayer/generated";

export const revalidate = 60;

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = searchParams.page || "1";
  const category = searchParams.category;

  if (isNaN(parseInt(page))) {
    throw new Error("Invalid page");
  }

  const intPage = parseInt(page);

  const sortedPosts = allPosts
    .sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    })
    .filter((post) => {
      return category ? post.category === category : true;
    });

  const list = sortedPosts.slice(intPage * 7 - 7, intPage * 7);

  const totalPage = Math.ceil(sortedPosts.length / 7);

  return (
    <div className="min-h-[calc(100vh-10rem)] py-6">
      <div
        key={page + category}
        className="animate-fade-up divide-y divide-dashed divide-slate-300"
      >
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
      <MenuTrigger />
      <Menu />
    </div>
  );
}
