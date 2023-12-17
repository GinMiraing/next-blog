import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { BasicSettings } from "@/lib/setting";

import FriendsLink from "@/components/FriendsLink";

const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${BasicSettings.name} - 友情链接`,
  description: `${BasicSettings.description}`,
};

export default async function Page() {
  return (
    <div className="min-h-[calc(100vh-10rem)] animate-fade space-y-6 py-6">
      <FriendsLink />
      <Comments />
    </div>
  );
}
