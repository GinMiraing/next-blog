"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { allPosts } from "@/.contentlayer/generated";

import Postcard from "../Postcard";

const Postlist = () => {
  const sortedPosts = useMemo(() => {
    return allPosts.sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    });
  }, [allPosts]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pagesize = searchParams.get("pagesize") || "8";

  const pagesizeRef = useRef(parseInt(pagesize));

  const [list, setList] = useState(sortedPosts.slice(0, pagesizeRef.current));

  const loadmoreHandler = () => {
    if (typeof window === "undefined") {
      return;
    }
    pagesizeRef.current = pagesizeRef.current + 8;
    window.history.replaceState(
      {},
      "",
      `${pathname}?pagesize=${pagesizeRef.current}`,
    );
    setList(sortedPosts.slice(0, pagesizeRef.current));
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
      <button onClick={() => loadmoreHandler()}>加载更多</button>
    </>
  );
};

export default Postlist;
