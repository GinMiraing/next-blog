import type { Metadata } from "next";

import { BasicSettings } from "@/lib/setting";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: `${BasicSettings.name}`,
  description: `${BasicSettings.description}`,
  icons: "/favicon.ico",
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
        <Header />
        <main className="mx-auto max-w-3xl px-6 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
