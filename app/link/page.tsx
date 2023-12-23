import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { Suspense } from "react";

import { getFriends } from "@/lib/backend";
import { BasicSettings } from "@/lib/setting";

const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60 * 30;

export const metadata: Metadata = {
  title: `${BasicSettings.name} - 友情链接`,
  description: `${BasicSettings.description}`,
};

export default async function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
          <Loader2 className="mr-2 animate-spin text-pink" />
          加载中...
        </div>
      }
    >
      <StreamPage />
    </Suspense>
  );
}

const StreamPage: React.FC = async () => {
  const data = await getFriends();

  if (data.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-6">
        <h1 className="text-2xl">加载失败，请刷新重试</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] animate-fade space-y-6 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((item) => (
          <Link
            target="_blank"
            key={item.name}
            className="flex w-full rounded-md px-4 py-4 transition-colors hover:bg-gray-100 hover:text-pink"
            href={item.link}
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src={item.avatar}
                alt={item.name}
                layout="fill"
                className="object-cover object-center"
              />
            </div>
            <div className="ml-4 flex w-full flex-col">
              <div className="text-lg">{item.name}</div>
              <div className="mt-2 text-sm">{item.description}</div>
            </div>
          </Link>
        ))}
      </div>
      <Comments />
    </div>
  );
};
