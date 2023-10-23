import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Postlist from "@/components/Postlist";

export default function Page() {
  return (
    <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow sm:mx-16 sm:my-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
      <Banner />
      <div className="px-4 sm:px-6 sm:pt-4">
        <Postlist />
        <Footer />
      </div>
    </main>
  );
}
