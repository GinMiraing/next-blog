"use client";

import { Fancybox } from "@fancyapps/ui";
import { useWindowScroll } from "@uidotdev/usehooks";
import { ChevronUp } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

const Markdown: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [{ x, y }, scrollTo] = useWindowScroll();

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      groupAll: true,
      Thumbs: false,
      Carousel: {
        transition: "slide",
      },
      Images: {
        zoom: false,
      },
      showClass: "f-fadeSlowIn",
      hideClass: "f-fadeSlowOut",
      wheel: "slide",
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"],
        },
      },
    });

    return () => {
      Fancybox.unbind("[data-fancybox]");
      Fancybox.close();
    };
  }, []);

  return (
    <>
      {children}
      <button
        title="返回顶部"
        aria-label="返回顶部"
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-md bg-pink text-white shadow transition-opacity sm:bottom-24 sm:right-4 sm:h-12 sm:w-12",
          {
            "opacity-100": y && y > 200,
            "pointer-events-none opacity-0": !y || y < 200,
          },
        )}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  );
};

export default Markdown;
