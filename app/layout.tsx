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
    <html
      lang="zh-CN"
      className="dark"
    >
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link
          rel="stylesheet"
          href="https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.7.0/lxgwwenkaiscreen.min.css"
        />
      </head>
      <body className="bg-[#f0e9dc] text-[#313135] dark:bg-neutral-800 dark:text-[#d9dad3]">
        <Header />
        <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow dark:bg-neutral-700 sm:mx-16 sm:my-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
