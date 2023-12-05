"use client";

import { Menu } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";

import { BasicSettings, NavbarItems } from "@/lib/setting";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-10 overflow-hidden border-b bg-background shadow transition-all duration-500 ease-in-out md:max-h-[5rem]",
        {
          "max-h-[8.5rem]": open,
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
          <nav className="flex items-center">
            <div className="hidden space-x-6 sm:block">
              {NavbarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="underline-offset-4 transition-colors hover:text-pink hover:underline"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <button
              type="button"
              title="打开导航栏"
              aria-label="打开导航栏"
              className="transition-colors hover:text-pink sm:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Menu />
            </button>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        {NavbarItems.map((item) => (
          <Link
            onClick={() => setOpen(false)}
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
