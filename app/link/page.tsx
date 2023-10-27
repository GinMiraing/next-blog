import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { BasicSettings } from "@/lib/setting";

import Banner from "@/components/Banner";
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
    <>
      <Banner />
      <div className="px-4 sm:px-6">
        <FriendsLink />
        <Comments />
        <Footer />
      </div>
    </>
  );
}
