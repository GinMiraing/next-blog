import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";

import { AboutAnimates, AboutTools, BasicSettings } from "@/lib/setting";

import AboutGallary from "@/components/AboutGallary";

const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${BasicSettings.name} - 关于`,
  description: `${BasicSettings.description}`,
};

export default async function Page() {
  return (
    <div className="min-h-[calc(100vh-10rem)] animate-fade space-y-6 py-6">
      <p className="text-justify text-sm/8 sm:text-base/8">
        一个{" "}
        <span className="rounded bg-red-100 px-1 py-0.5">全栈开发程序员</span>{" "}
        ；
        <span className="rounded bg-blue-100 px-1 py-0.5 line-through">
          老二次元（划掉）
        </span>
        ；
        <span className="rounded bg-green-100 px-1 py-0.5 line-through">
          街健爱好者（划掉）
        </span>
        ，由于工作经常加班，没时间健身，现已变胖...
      </p>
      <p className="text-justify text-sm/8 sm:text-base/8">
        编程使用 JavaScript 语言，前端 Next.js 和 Remix，后端 NestJS，样式库
        Tailwind CSS 和 Radix UI，使用 Docker 部署网站。
      </p>
      <div className="flex h-20 w-full divide-x divide-slate-300 overflow-hidden rounded border border-slate-300">
        {AboutTools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.url}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex basis-1/6 items-center justify-center p-4 transition-all hover:basis-1/2 hover:bg-gray-100"
          >
            <Image
              className="rounded-full object-cover object-center"
              src={`${tool.icon}/about_icon`}
              alt={tool.name}
              width={40}
              height={40}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
      <p className="text-justify text-sm/8 sm:text-base/8">
        喜欢看动漫，在初中就进了二次元的坑，我还记得我的入坑作是《灼眼的夏娜》，这部番有三季，每季
        24
        集，不缩水的片长和庞大的世界观让我看得非常享受。但随着年龄的增长，曾经熬夜追番的热情却逐渐减弱，再加上学习和工作，现在也只是偶尔有空看动漫了，这两年的新番我都没怎么看过。这里放一些我喜欢的比较冷门的动漫吧：
      </p>
      <AboutGallary>
        {AboutAnimates.map((item) => (
          <Link
            key={item.name}
            href={item.cover}
            data-fancybox
            className="group relative h-full basis-1/4 transition-all hover:basis-1/2"
          >
            <Image
              className="object-cover object-center"
              src={`${item.cover}/post_thumb`}
              alt={item.name}
              layout="fill"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 flex h-20 translate-y-20 items-center justify-center bg-black/40 transition-transform group-hover:translate-y-0">
              <div className="font-medium text-white">{item.name}</div>
            </div>
          </Link>
        ))}
      </AboutGallary>
      <p className="text-justify text-sm/8 sm:text-base/8">
        谈到街健这个爱好，还要从大学的社团说起。我在大学加入了学校的舟艇社团，如果有人认为，这个社团的活动项目是非常惬意的“泛舟湖面”，那就大错特错了，我们的项目的确有“舟”，但这个“舟”是龙舟，而且是“龙舟竞渡”。为了保持成员的水平，每周进行大量训练是不可避免的，在这种氛围下，喜欢上健身自然正常。为什么更喜欢街健呢？难道你不觉得双力臂、倒立、人体旗帜、俄挺这些动作很酷吗！偷偷放一张之前健身时期的照片，看看以前，再看看现在，岁月是把杀猪刀。
      </p>
      <div className="flex w-full items-center justify-center">
        <Link
          href="https://cdn.zengjunyin.com/images/b4006019c64d02d18cf2581bb937880cdb497810.jpg"
          data-fancybox
          className="relative h-80 w-80 overflow-hidden rounded transition-all hover:brightness-75"
        >
          <Image
            className="object-cover object-center"
            src="https://cdn.zengjunyin.com/images/b4006019c64d02d18cf2581bb937880cdb497810.jpg"
            alt="健身时期的照片"
            layout="fill"
            loading="lazy"
          />
        </Link>
      </div>
      <p className="text-justify text-sm/8 sm:text-base/8">
        以上就是我的三个身份，不幸的是，程序员👨‍💻身份杀死了另外两个，生活就像一只无形的手，操控着整个棋局，希望有朝一日，我还能成为曾经那个喜欢二次元、热爱街健的少年。
      </p>
      <Comments />
    </div>
  );
}
