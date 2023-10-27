"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Postlist: React.FC<{ children: React.ReactNode; totalPosts: number }> = ({
  children,
  totalPosts,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pagesize = searchParams.get("pagesize") || "7";
  const pagesizeInt = parseInt(pagesize);

  const loadmoreHandler = () => {
    const newSize = pagesizeInt + 7;
    router.push(`?pagesize=${newSize}`, { scroll: false });
  };

  return (
    <>
      {children}
      {pagesizeInt < totalPosts && (
        <div className="flex w-full justify-center py-6">
          <button
            className="hover:text-pink"
            onClick={() => loadmoreHandler()}
          >
            加载更多
          </button>
        </div>
      )}
      {pagesizeInt >= totalPosts && (
        <div className="w-full py-6 text-center">暂无更多...</div>
      )}
    </>
  );
};

export default Postlist;
