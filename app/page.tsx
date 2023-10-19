import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow sm:mx-16 sm:mt-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
      <Banner />
      <Navbar />
    </main>
  );
}
