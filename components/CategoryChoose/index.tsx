"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Categories } from "@/lib/setting";
import { cn } from "@/lib/utils";

const CategoryChoose: React.FC<{
  crurentCategory?: string;
}> = ({ crurentCategory }) => {
  const [show, setShow] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const bodyClickHandler = (e: MouseEvent) => {
    if (!dropDownRef.current?.contains(e.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", bodyClickHandler);

    return () => {
      window.removeEventListener("click", bodyClickHandler);
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium text-xl">
        当前分类：{crurentCategory ? crurentCategory : "全部"}
      </h1>
      <div
        ref={dropDownRef}
        className="relative z-50 flex h-10 w-28 flex-col"
      >
        <button
          className="flex h-full w-full shrink-0 items-center justify-center rounded-md border font-medium text-sm transition-colors hover:bg-gray-100 hover:text-pink"
          onClick={() => setShow((prev) => !prev)}
        >
          {crurentCategory ? crurentCategory : "选择分类"}
        </button>
        <div
          className={cn(
            "mt-1 flex w-full flex-col rounded-md border bg-white opacity-100 transition-opacity",
            {
              "pointer-events-none opacity-0": !show,
            },
          )}
        >
          {Categories.map((item) => (
            <Link
              href={
                item.name === "全部"
                  ? "/category"
                  : `/category?category=${item.name}`
              }
              key={item.key}
              className="flex cursor-pointer items-center justify-center bg-white p-2 text-sm transition-colors hover:bg-gray-100 hover:text-pink"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChoose;
