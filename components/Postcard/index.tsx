import Link from "next/link";

import { Post } from "@/.contentlayer/generated";

const Postcard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex w-full flex-col pb-4 pt-3">
      <Link
        className="text-2xl font-bold transition-colors hover:text-pink"
        href={post.url}
      >
        {post.title}
      </Link>
      <Link
        className="my-2 line-clamp-2 text-sm/6 transition-colors hover:text-pink sm:text-base/8"
        href={post.url}
      >
        {post.description}
      </Link>
      <p className="text-sm">{post.date}</p>
    </div>
  );
};

export default Postcard;
