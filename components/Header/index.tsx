"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BasicSettings, NavbarItems } from "@/lib/setting";
import { cn } from "@/lib/utils";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-white shadow-md transition-all duration-1000 sm:hidden",
        {
          "max-h-16": !showMenu,
          "max-h-screen": showMenu,
        },
      )}
    >
      <div className="flex h-16 w-full shrink-0 items-center justify-between px-4">
        <Link
          href="/"
          className="hover:text-pink text-lg font-bold transition-colors"
        >
          {BasicSettings.name}
        </Link>
        <button onClick={() => setShowMenu((prev) => !prev)}>
          <Menu />
        </button>
      </div>
      <div className="flex w-full flex-col items-center">
        {NavbarItems.map((item) => (
          <div
            key={item.name}
            className="h-12 w-full px-4"
          >
            <Link
              className="flex h-full w-full items-center justify-center rounded py-2 transition-colors hover:bg-black/10"
              href={item.link}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;