import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { notFound } from "next/navigation";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Markdown from "@/components/Markdown";

import { allPosts } from "@/.contentlayer/generated";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = allPosts.find((post) => post._raw.flattenedPath === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Banner />
      <div className="px-4 sm:px-6">
        <Markdown post={post} />
        <Footer />
      </div>
    </>
  );
}
