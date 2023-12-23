"use client";

import { Fancybox } from "@fancyapps/ui";
import { useEffect } from "react";

const AboutGallary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
  }, []);

  return (
    <div className="flex h-[280px] w-full overflow-hidden rounded sm:h-[400px]">
      {children}
    </div>
  );
};

export default AboutGallary;
