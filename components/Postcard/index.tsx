import { ChevronRight, Tag } from "lucide-react";
import Link from "next/link";

const Postcard: React.FC<{
  post: {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
  };
}> = ({ post }) => {
  const { id, title, description, date, category } = post;

  return (
    <div className="flex w-full flex-col space-y-4 py-4">
      <Link
        href={`/posts/${id}`}
        className="line-clamp-1 text-center font-medium text-xl transition-colors hover:text-pink"
      >
        {title}
      </Link>
      <data className="text-center text-sm">{date}</data>
      <Link
        href={`/posts/${id}`}
        className="line-clamp-2 text-justify text-sm/8 transition-colors hover:text-pink sm:text-base/8"
      >
        {description}
      </Link>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>{category}</span>
        </div>
        <Link
          href={`/posts/${id}`}
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
