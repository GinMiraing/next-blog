"use client";

import Link from "next/link";

import { FriendsLinkItems } from "@/lib/setting";

const FriendsLink = () => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
      {FriendsLinkItems.map((item) => (
        <Link
          target="_blank"
          key={item.name}
          className="flex w-full rounded-sm px-4 py-4 transition-colors hover:bg-gray-100 hover:text-pink"
          href={item.link}
        >
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <img
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://www.cravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
              }}
              src={item.avatar}
              alt={item.name}
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
