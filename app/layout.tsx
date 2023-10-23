import type { Metadata } from "next";

import { BasicSettings } from "@/lib/setting";

import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: `${BasicSettings.name}`,
  description: `${BasicSettings.description}`,
  icons: "/favicon.ico",
  referrer: "same-origin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.staticfile.org/lxgw-wenkai-webfont/1.7.0/lxgwwenkai-bold.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.staticfile.org/lxgw-wenkai-webfont/1.7.0/lxgwwenkai-regular.min.css"
        />
      </head>
      <body className="bg-[url('https://cdn.zengjunyin.com/9B54A4959F1F0AB9DDB324F5CE8195A5.png')] bg-fixed bg-repeat">
        <Header />
        <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow sm:mx-16 sm:my-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
