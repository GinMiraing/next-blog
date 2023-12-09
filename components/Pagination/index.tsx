"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const Pagination: React.FC<{
  currentPage: number;
  totalPage: number;
}> = ({ currentPage, totalPage }) => {
  const router = useRouter();

  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (item) => item > 1 && item < totalPage,
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => router.push("/")}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-100 disabled:bg-pink disabled:text-white"
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
              `/?page=${page}
                `,
            )
          }
          disabled={page === currentPage}
          className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-100 disabled:bg-pink disabled:text-white"
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
        onClick={() => router.push(`/?page=${totalPage}`)}
        disabled={currentPage === totalPage}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-100 disabled:bg-pink disabled:text-white",
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
