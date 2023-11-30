import type { Metadata } from "next";

import { BasicSettings } from "@/lib/setting";

import Banner from "@/components/Banner";
import Menu from "@/components/Menu";

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
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link
          rel="stylesheet"
          href="https://s1.hdslb.com/bfs/static/jinkela/long/font/medium.css"
        />
        <link
          rel="stylesheet"
          href="https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css"
        />
      </head>
      <body className="bg-background font-regular text-primary">
        <Banner />
        <main className="mx-auto min-h-screen max-w-3xl px-4 pb-8 pt-24">
          {children}
        </main>
        <Menu />
      </body>
    </html>
  );
}
