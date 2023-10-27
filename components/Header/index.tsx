"use client";

import { Menu, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BasicSettings, NavbarItems } from "@/lib/setting";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const changeTheme = () => {
    const html = document.querySelector("html");
    if (html) {
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
      } else {
        html.classList.add("dark");
      }
    }
  };

  return (
    <div
      className={cn(
        "header fixed top-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-white shadow-md dark:bg-neutral-800 sm:hidden",
        {
          "max-h-16": !showMenu,
          "max-h-screen": showMenu,
        },
      )}
    >
      <div className="flex h-16 w-full shrink-0 items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg hover:text-pink"
        >
          {BasicSettings.name}
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeTheme()}
            className="hover:text-pink"
          >
            <Sun />
          </button>
          <button onClick={() => setShowMenu((prev) => !prev)}>
            <Menu />
          </button>
        </div>
      </div>
      <div className="flex w-full grow flex-col items-center">
        {NavbarItems.map((item) => (
          <div
            key={item.name}
            className="h-12 w-full px-4"
          >
            <Link
              onClick={() => setShowMenu(false)}
              className="flex h-full w-full items-center justify-center rounded py-2 hover:bg-black/10 hover:text-pink"
              href={item.link}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="space-y-2 px-4 pb-4 pt-6 text-center text-sm">
        <Link
          className="hover:text-pink"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"
        >
          CC BY-NC-SA 4.0
        </Link>
        <p>©️ 2023 胤 版权所有</p>
      </div>
    </div>
  );
};

export default Header;
