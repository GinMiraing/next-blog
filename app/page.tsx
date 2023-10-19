import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Postcard from "@/components/Postcard";

import { allPosts } from "@/.contentlayer/generated";

export default function Page() {
  return (
    <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow sm:mx-16 sm:mt-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
      <Banner />
      <Navbar />
      <div className="divide-y-2 px-6">
        {allPosts.map((post) => (
          <Postcard
            key={post._raw.flattenedPath}
            post={post}
          />
        ))}
      </div>
    </main>
  );
}
