import Link from "next/link";

import { FooterItems } from "@/lib/setting";

const Footer: React.FC = () => {
  return (
    <div className="flex h-20 flex-col items-center justify-between border-t bg-white px-6 py-4 sm:flex-row sm:p-6">
      <div className="text-sm sm:text-base">©️ 2023 胤 版权所有</div>
      <div className="flex items-center space-x-2 text-sm sm:text-base">
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
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
