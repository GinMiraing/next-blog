"use client";

import Image from "next/legacy/image";
import Link from "next/link";

import { BasicSettings } from "@/lib/setting";

import NavBar from "@/components/Navbar";

const Banner: React.FC = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-20 justify-center border-b bg-background">
      <div className="flex w-full max-w-5xl items-center justify-between p-6">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="relative h-9 w-9 overflow-hidden rounded-full border sm:h-12 sm:w-12"
          >
            <Image
              src={BasicSettings.avatar}
              alt="avatar"
              className="object-cover object-center"
              layout="fill"
              referrerPolicy="no-referrer"
            />
          </Link>
          <Link
            href="/"
            className="font-medium text-lg transition-colors hover:text-pink sm:text-2xl"
          >
            {BasicSettings.name}
          </Link>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default Banner;
