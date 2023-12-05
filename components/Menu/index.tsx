"use client";

import { useStore } from "@nanostores/react";
import { Command, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Categories } from "@/lib/setting";
import { cn } from "@/lib/utils";

import { MenuOpen } from "@/store/menu";

const MenuTrigger: React.FC = () => {
  const btnClickHandler = () => {
    MenuOpen.set(true);
    const body = document.querySelector("body") as HTMLBodyElement;
    if (body) {
      body.classList.add("overflow-hidden");
    }
  };

  return (
    <button
      title="打开控制台"
      aria-label="打开控制台"
      onClick={() => btnClickHandler()}
      className="fixed bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-md bg-pink text-white shadow transition-colors hover:bg-rose-300 sm:bottom-24 sm:right-4 sm:h-12 sm:w-12"
    >
      <Command className="h-5 w-5" />
    </button>
  );
};

const Menu: React.FC<{
  currentCategory: string;
}> = ({ currentCategory }) => {
  const open = useStore(MenuOpen);

  const pathname = usePathname();
  const router = useRouter();

  const btnClickHandler = () => {
    MenuOpen.set(false);
    const body = document.querySelector("body") as HTMLBodyElement;
    if (body) {
      body.classList.remove("overflow-hidden");
    }
  };

  const setSearchParams = async (value: string) => {
    if (value === "全部") {
      router.push(`${pathname}?page=1`);
    } else {
      router.push(`${pathname}?page=1&category=${value}`);
    }

    btnClickHandler();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-white/80 backdrop-blur transition-opacity duration-300 ease-in-out",
        {
          "pointer-events-none opacity-0": !open,
        },
      )}
    >
      <div className="flex h-full w-full max-w-3xl flex-col space-y-8 rounded-md border bg-white p-8 drop-shadow sm:h-1/2 sm:w-1/2">
        <div className="flex w-full items-center justify-between">
          <div className="font-medium text-xl">控制台</div>
          <button
            title="关闭控制台"
            aria-label="关闭控制台"
            onClick={() => btnClickHandler()}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div>分类</div>
          <div className="space-x-4">
            {Categories.map((item) => (
              <button
                disabled={currentCategory === item.name}
                onClick={() => setSearchParams(item.name)}
                className="rounded border bg-white px-2 py-1 transition-colors hover:bg-gray-50 hover:text-pink disabled:bg-gray-50 disabled:text-pink"
                key={item.key}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MenuTrigger, Menu };
