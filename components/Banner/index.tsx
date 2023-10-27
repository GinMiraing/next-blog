import Image from "next/legacy/image";

import { BasicSettings } from "@/lib/setting";

const Banner = () => {
  return (
    <div className="relative h-60 w-full bg-slate-300 sm:h-80">
      <Image
        src={
          "https://article.biliimg.com/bfs/article/fed9bd2053975d67b3d9ba0ce9d31592129000357.jpg@.webp"
        }
        layout="fill"
        alt="banner"
        className="object-cover object-bottom"
        referrerPolicy="no-referrer"
        priority
      />
      <div className="absolute bottom-0 z-10 h-32 w-full bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="absolute z-20 flex h-full w-full flex-col items-end justify-end p-6 sm:p-7">
        <div className="flex w-full items-end justify-end">
          <p className="mr-6 text-xl text-white sm:text-2xl">
            {BasicSettings.description}
          </p>
          <div className="relative h-10 w-10 sm:h-12 sm:w-12">
            <Image
              src={BasicSettings.avatar}
              alt="avatar"
              className="object-cover object-center"
              layout="fill"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
