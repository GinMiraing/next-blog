import dynamic from "next/dynamic";
import { Suspense } from "react";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Postcard from "@/components/Postcard";

import { allPosts } from "@/.contentlayer/generated";

const Postlist = dynamic(() => import("@/components/Postlist"));

export const revalidate = 60;

const sortedPosts = allPosts.sort((a, b) => {
  return a.id < b.id ? 1 : -1;
});

const PostlistFallback = () => {
  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  );
};

export default function Page({
  searchParams,
}: {
  searchParams: { pagesize?: string };
}) {
  const { pagesize } = searchParams;
  const pagesizeInt = pagesize ? parseInt(pagesize) : 7;

  const list = sortedPosts.slice(0, pagesizeInt);

  return (
    <>
      <Banner />
      <div className="px-4 sm:px-6 sm:pt-4">
        <Suspense fallback={<PostlistFallback />}>
          <Postlist totalPosts={allPosts.length}>
            <div className="mt-4 divide-y divide-dashed divide-slate-300 dark:divide-neutral-500 sm:mt-0">
              {list.map((post) => (
                <Postcard
                  key={post._raw.flattenedPath}
                  post={post}
                />
              ))}
            </div>
          </Postlist>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}
