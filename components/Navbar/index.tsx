import Link from "next/link";

import { NavbarItems } from "@/lib/setting";

const Navbar = () => {
  return (
    <div className="mt-2 hidden w-full justify-end space-x-4 py-2 sm:flex">
      {NavbarItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className="bg-pink/50 underline-offset-4 transition-colors hover:text-pink hover:underline"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
