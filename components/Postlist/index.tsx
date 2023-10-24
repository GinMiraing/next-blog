"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Post, allPosts } from "@/.contentlayer/generated";

import Postcard from "../Postcard";

const sortedPosts = allPosts.sort((a, b) => {
  return a.id < b.id ? 1 : -1;
});

const Postlist = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pagesize = searchParams.get("pagesize") || "7";

  const [list, setList] = useState<Post[]>(
    sortedPosts.slice(0, parseInt(pagesize)),
  );

  const loadmoreHandler = () => {
    const newSize = parseInt(pagesize) + 7;
    setList(sortedPosts.slice(0, newSize));
    router.push(`?pagesize=${newSize}`, { scroll: false });
  };

  return (
    <>
      <div className="mt-4 divide-y sm:mt-0">
        {list.map((post) => (
          <Postcard
            key={post._raw.flattenedPath}
            post={post}
          />
        ))}
      </div>
      <div
        className={cn("flex w-full justify-center py-6", {
          hidden: parseInt(pagesize) >= allPosts.length,
        })}
      >
        <button
          className="transition-colors hover:text-pink"
          onClick={() => loadmoreHandler()}
        >
          加载更多
        </button>
      </div>
      <div
        className={cn("w-full py-6 text-center", {
          hidden: parseInt(pagesize) < allPosts.length,
        })}
      >
        暂无更多...
      </div>
    </>
  );
};

export default Postlist;
