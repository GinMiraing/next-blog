"use client";

import Link from "next/link";

import { NavbarItems } from "@/lib/setting";

const Footer = () => {
  return (
    <>
      <hr className="hidden sm:block" />
      <div className="mt-6 hidden items-end justify-between pb-6 text-sm sm:flex">
        <div className="space-y-2">
          <Link
            className="transition-colors hover:text-pink"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"
          >
            CC BY-NC-SA 4.0
          </Link>
          <p>©️ 2023 胤 版权所有</p>
        </div>
        <div className="space-x-4">
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
      </div>
    </>
  );
};

export default Footer;
