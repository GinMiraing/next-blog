import type { Metadata } from "next";

import { BasicSettings } from "@/lib/setting";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FriendsLink from "@/components/FriendsLink";

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
        <Footer />
      </div>
    </>
  );
}
