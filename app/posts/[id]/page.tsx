"use client";

import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Markdown from "@/components/Markdown";

import { allPosts } from "@/.contentlayer/generated";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = allPosts.find((post) => post._raw.flattenedPath === id);

  if (!post) {
    return <div>Not found</div>;
  }

  return (
    <>
      <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow sm:mx-16 sm:my-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
        <Banner />
        <div className="px-4 sm:px-6">
          <Markdown post={post} />
          <Footer />
        </div>
      </main>
    </>
  );
}
