"use client";

import { useStore } from "@nanostores/react";
import { Menu } from "lucide-react";
import Link from "next/link";

import { NavbarItems } from "@/lib/setting";

import { menuOpen } from "@/store/menu";

const NavBar: React.FC = () => {
  const open = useStore(menuOpen);
  return (
    <nav>
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
        title="打开菜单栏"
        aria-label="打开菜单栏"
        className="transition-colors hover:text-pink sm:hidden"
        onClick={() => menuOpen.set(!open)}
      >
        <Menu />
      </button>
    </nav>
  );
};

export default NavBar;
