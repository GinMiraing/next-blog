import Link from "next/link";

import { FooterItems } from "@/lib/setting";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between space-y-4 border-t bg-white p-6 sm:flex-row sm:space-y-0">
      <div>©️ 2023 胤 版权所有</div>
      <div className="flex items-center space-x-2">
        <Link
          target="_blank"
          className="underline-offset-4 transition-colors hover:text-pink hover:underline"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"
        >
          CC BY-NC-SA 4.0
        </Link>
        {FooterItems.map((item) => (
          <img
            src={item.src}
            alt={item.name}
            key={item.name}
            className="h-5 w-5"
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
