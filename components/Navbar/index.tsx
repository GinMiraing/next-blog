"use client";

import { useStore } from "@nanostores/react";
import { Menu } from "lucide-react";
import Link from "next/link";

import { NavbarItems } from "@/lib/setting";

import { NavbarOpen } from "@/store/navbar";

const NavBar: React.FC = () => {
  const open = useStore(NavbarOpen);

  return (
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
        onClick={() => NavbarOpen.set(!open)}
      >
        <Menu />
      </button>
    </nav>
  );
};

export default NavBar;
