"use client";

import { useStore } from "@nanostores/react";
import Image from "next/legacy/image";
import Link from "next/link";

import { BasicSettings, NavbarItems } from "@/lib/setting";
import { cn } from "@/lib/utils";

import NavBar from "@/components/Navbar";

import { menuOpen } from "@/store/menu";

const Header: React.FC = () => {
  const open = useStore(menuOpen);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-10 overflow-hidden border-b bg-background shadow transition-all duration-500 ease-in-out md:max-h-[5rem]",
        {
          "max-h-[12rem]": open,
          "max-h-[5rem]": !open,
        },
      )}
    >
      <div className="flex justify-center">
        <div className="flex h-20 w-full max-w-5xl items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="relative h-9 w-9 overflow-hidden rounded-full border sm:h-12 sm:w-12"
            >
              <Image
                src={BasicSettings.avatar}
                alt="avatar"
                className="object-cover object-center"
                layout="fill"
                referrerPolicy="no-referrer"
              />
            </Link>
            <Link
              href="/"
              className="font-medium text-lg transition-colors hover:text-pink sm:text-2xl"
            >
              {BasicSettings.name}
            </Link>
          </div>
          <NavBar />
        </div>
      </div>
      <div className="flex flex-col">
        {NavbarItems.map((item) => (
          <Link
            onClick={() => menuOpen.set(false)}
            key={item.name}
            href={item.link}
            className="flex h-14 w-full items-center justify-center transition-colors hover:bg-gray-100 hover:text-pink"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
