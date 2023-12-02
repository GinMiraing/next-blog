import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { BasicSettings } from "@/lib/setting";

import Footer from "@/components/Footer";
import FriendsLink from "@/components/FriendsLink";

const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${BasicSettings.name} - 友情链接`,
  description: `${BasicSettings.description}`,
};

export default function Page() {
  return (
    <div className="animate-fade-up space-y-6 pt-4">
      <FriendsLink />
      <Comments />
    </div>
  );
}
