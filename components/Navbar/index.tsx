import Link from "next/link";

import { NavbarItems } from "@/lib/setting";

const Navbar = () => {
  return (
    <div className="hidden w-full space-x-4 p-6 sm:flex">
      {NavbarItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className="bg-pink hover:bg-pink/50 rounded-md px-2 py-1 text-white transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
