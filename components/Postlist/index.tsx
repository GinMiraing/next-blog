"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { Post, allPosts } from "@/.contentlayer/generated";

import Postcard from "../Postcard";

const Postlist = () => {
  const sortedPosts = useMemo(() => {
    return allPosts.sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    });
  }, [allPosts]);

  const route = useRouter();
  const searchParams = useSearchParams();
  const pagesize = searchParams.get("pagesize") || "8";

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Post[]>(
    sortedPosts.slice(0, parseInt(pagesize)),
  );

  const loadmoreHandler = () => {
    setLoading(true);
    route.push(`/?pagesize=${parseInt(pagesize) + 8}`, { scroll: false });
    setList(sortedPosts.slice(0, parseInt(pagesize) + 8));
    setLoading(false);
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
          hidden: loading || parseInt(pagesize) >= allPosts.length,
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
          hidden: loading || parseInt(pagesize) < allPosts.length,
        })}
      >
        暂无更多...
      </div>
      {loading && <Loading />}
    </>
  );
};

const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div>
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="var(--pink)"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div>loading...</div>
    </div>
  );
};

export default Postlist;