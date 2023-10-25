import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Banner />
      <div className="px-4 sm:px-6">
        <div className="flex h-96 flex-col items-center justify-center">
          <h1 className="text-2xl">404 - 页面不存在</h1>
          <a
            className="mt-4 text-lg transition-colors hover:text-pink"
            href="/"
          >
            返回主页
          </a>
        </div>
        <Footer />
      </div>
    </>
  );
}
