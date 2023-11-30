"use client";

import { ChevronRight, Tag } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";

import { Post } from "@/.contentlayer/generated";

const Postcard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex w-full animate-fade-up flex-col space-y-4 py-4">
      <h2 className="line-clamp-1 text-center font-medium text-xl">
        {post.title}
      </h2>
      <p className="text-center text-sm">{post.date}</p>
      {/* <div className="relative block h-40 w-full overflow-hidden rounded-lg sm:h-60">
        <Image
          referrerPolicy="no-referrer"
          priority
          src={
            `${"https://article.biliimg.com/bfs/article/92f1a5a81b2cca32bd5702c382110b17129000357.jpg"}@900w_450h_1c.webp` as string
          }
          alt={"alt" || ""}
          layout="fill"
          className="object-cover object-center"
        />
      </div> */}
      <p className="line-clamp-2 text-justify text-sm/8 sm:text-base/8">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>技术</span>
        </div>
        <Link
          href={post.url}
          className="flex items-center space-x-1 text-sm transition-colors hover:text-pink"
        >
          <span>阅读更多</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Postcard;
