"use client";

import Link from "next/link";

import { Post } from "@/.contentlayer/generated";

const Postcard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex w-full flex-col py-4">
      <Link
        className="line-clamp-1 text-center text-xl font-bold transition-colors hover:text-pink"
        href={post.url}
      >
        {post.title}
      </Link>
      <p className="my-6 text-center text-sm">{post.date}</p>
      <Link
        className="line-clamp-2 text-justify text-sm/8 transition-colors hover:text-pink sm:text-base/8"
        href={post.url}
      >
        {post.description}
      </Link>
    </div>
  );
};

export default Postcard;
