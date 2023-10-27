import Image from "next/legacy/image";
import Link from "next/link";

import { FriendsLinkItems } from "@/lib/setting";

const FriendsLink: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
      {FriendsLinkItems.map((item) => (
        <Link
          target="_blank"
          key={item.name}
          className="flex w-full rounded-sm px-4 py-4 hover:bg-gray-100 hover:text-pink dark:hover:bg-neutral-600"
          href={item.link}
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={item.avatar}
              alt={item.name}
              layout="fill"
              referrerPolicy="no-referrer"
              className="object-cover object-center"
            />
          </div>
          <div className="ml-4 flex w-full flex-col">
            <div className="text-lg">{item.name}</div>
            <div className="mt-2 text-sm">{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FriendsLink;
