"use client";

import Link from "next/link";

import { sleep } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const linkClickHandler = async () => {
    await sleep(1000);
    reset();
  };
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-6">
      <h1 className="text-2xl">500 - {error.message}</h1>
      <Link
        className="mt-4 text-lg hover:text-pink"
        href="/"
        onClick={() => linkClickHandler()}
      >
        返回主页
      </Link>
    </div>
  );
}
