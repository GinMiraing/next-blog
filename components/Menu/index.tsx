"use client";

import { useStore } from "@nanostores/react";
import { ChevronUp, Command, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Categories } from "@/lib/setting";
import { cn, sleep } from "@/lib/utils";

import { CurrentCategory, MenuOpen } from "@/store/menu";

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

const Menu: React.FC = () => {
  const open = useStore(MenuOpen);
  const currentCategory = useStore(CurrentCategory);

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
      CurrentCategory.set("全部");
      router.push(`${pathname}?page=1`);
    } else {
      CurrentCategory.set(value);
      router.push(`${pathname}?page=1&category=${value}`);
    }
    await sleep(100);
    btnClickHandler();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur",
        {
          hidden: !open,
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

const ToTop: React.FC = () => {
  return (
    <button
      title="返回顶部"
      aria-label="返回顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-md bg-pink text-white shadow transition-colors hover:bg-rose-300 sm:bottom-24 sm:right-4 sm:h-12 sm:w-12"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
};

export { MenuTrigger, Menu, ToTop };
