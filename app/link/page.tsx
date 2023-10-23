import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FriendsLink from "@/components/FriendsLink";

export default function Page() {
  return (
    <>
      <Banner />
      <div className="px-4 sm:px-6">
        <FriendsLink />
        <Footer />
      </div>
    </>
  );
}
