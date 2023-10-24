import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Postlist from "@/components/Postlist";

export const revalidate = 60;

export default function Page() {
  return (
    <>
      <Banner />
      <div className="px-4 sm:px-6 sm:pt-4">
        <Postlist />
        <Footer />
      </div>
    </>
  );
}
