import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-6">
      <h1 className="text-2xl">404 - 页面不存在</h1>
      <Link
        className="mt-4 text-lg hover:text-pink"
        href="/"
      >
        返回主页
      </Link>
    </div>
  );
}
