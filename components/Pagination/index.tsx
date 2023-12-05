"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const Pagination: React.FC<{
  currentPage: number;
  totalPage: number;
  currentCategory?: string;
}> = ({ currentPage, totalPage, currentCategory }) => {
  const pathname = usePathname();
  const router = useRouter();

  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (item) => item > 1 && item < totalPage,
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() =>
          router.push(
            `${pathname}?page=1${
              currentCategory ? `&category=${currentCategory}` : ""
            }`,
          )
        }
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-50 disabled:bg-pink disabled:text-white"
      >
        1
      </button>
      <div
        className={cn("flex h-9 w-9 items-center justify-center", {
          hidden: currentPage < 4,
        })}
      >
        ...
      </div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() =>
            router.push(
              `${pathname}?page=${page}${
                currentCategory ? `&category=${currentCategory}` : ""
              }`,
            )
          }
          disabled={page === currentPage}
          className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-50 disabled:bg-pink disabled:text-white"
        >
          {page}
        </button>
      ))}
      <div
        className={cn("flex h-9 w-9 items-center justify-center", {
          hidden: currentPage >= totalPage - 2,
        })}
      >
        ...
      </div>
      <button
        onClick={() =>
          router.push(
            `${pathname}?page=${totalPage}${
              currentCategory ? `&category=${currentCategory}` : ""
            }`,
          )
        }
        disabled={currentPage === totalPage}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-50 disabled:bg-pink disabled:text-white",
          {
            hidden: totalPage === 1,
          },
        )}
      >
        {totalPage}
      </button>
    </div>
  );
};

export default Pagination;
