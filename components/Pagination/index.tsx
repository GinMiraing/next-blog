import Link from "next/link";

import { cn } from "@/lib/utils";

const Pagination: React.FC<{
  currentPage: number;
  totalPage: number;
}> = ({ currentPage, totalPage }) => {
  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (item) => item > 1 && item < totalPage,
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <Link
        href={"/"}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-100",
          {
            "pointer-events-none bg-pink text-white": currentPage === 1,
          },
        )}
      >
        1
      </Link>
      <div
        className={cn("flex h-9 w-9 items-center justify-center", {
          hidden: currentPage < 4,
        })}
      >
        ...
      </div>
      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-100",
            {
              "pointer-events-none bg-pink text-white": page === currentPage,
            },
          )}
        >
          {page}
        </Link>
      ))}
      <div
        className={cn("flex h-9 w-9 items-center justify-center", {
          hidden: currentPage >= totalPage - 2,
        })}
      >
        ...
      </div>
      <Link
        href={`?page=${totalPage}`}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-gray-100",
          {
            hidden: totalPage === 1,
            "pointer-events-none bg-pink text-white": currentPage === totalPage,
          },
        )}
      >
        {totalPage}
      </Link>
    </div>
  );
};

export default Pagination;
