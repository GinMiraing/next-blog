import Link from "next/link";

import { Post } from "@/.contentlayer/generated";

const Postcard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex w-full flex-col pb-4 pt-2">
      <Link
        className="text-2xl font-bold transition-colors hover:text-pink"
        href={post.url}
      >
        {post.title}
      </Link>
      <Link
        className="my-2 transition-colors hover:text-pink"
        href={post.url}
      >
        {post.description}
      </Link>
      <p className="text-sm">{post.date}</p>
    </div>
  );
};

export default Postcard;
