"use client";

import { ChevronRight, Tag } from "lucide-react";
import Link from "next/link";

import { Post } from "@/.contentlayer/generated";

const Postcard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex w-full animate-fade-up flex-col space-y-4 py-4">
      <Link
        href={post.url}
        className="line-clamp-1 text-center font-medium text-xl transition-colors hover:text-pink"
      >
        {post.title}
      </Link>
      <data className="text-center text-sm">{post.date}</data>
      <Link
        href={post.url}
        className="line-clamp-2 text-justify text-sm/8 transition-colors hover:text-pink sm:text-base/8"
      >
        {post.description}
      </Link>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>{post.category}</span>
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
