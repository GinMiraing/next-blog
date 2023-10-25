import Banner from "@/components/Banner";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Banner />
      <div className="px-4 pt-4 sm:px-6">
        <Comments />
        <Footer />
      </div>
    </>
  );
}
