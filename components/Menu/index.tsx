"use client";

import { useStore } from "@nanostores/react";
import { X } from "lucide-react";
import Link from "next/link";

import { NavbarItems } from "@/lib/setting";
import { cn } from "@/lib/utils";

import { menuOpen } from "@/store/menu";

const Menu: React.FC = () => {
  const open = useStore(menuOpen);
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 top-0 z-20 bg-background p-6 transition-transform delay-75 duration-700 ease-in-out",
        {
          "-translate-x-full": !open,
        },
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="font-medium text-lg">导航栏</div>
        <button
          onClick={() => menuOpen.set(false)}
          className="transition-colors hover:text-pink"
          type="button"
          aria-label="关闭菜单栏"
          title="关闭菜单栏"
        >
          <X />
        </button>
      </div>
      <div className="mt-4 flex w-full flex-col space-y-2">
        {NavbarItems.map((item) => (
          <Link
            onClick={() => menuOpen.set(false)}
            key={item.name}
            href={item.link}
            className="w-full py-4 text-center transition-colors hover:bg-black/10 hover:text-pink"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
