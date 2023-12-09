import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="flex h-20 items-center justify-between space-x-4 border-t bg-white px-6 py-4 text-sm sm:p-6 sm:text-base">
      <div>©️ 2023 胤 版权所有</div>
      <Link
        className="transition-colors hover:text-pink"
        href="https://beian.miit.gov.cn"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        闽 ICP 备 2021019269 号
      </Link>
    </div>
  );
};

export default Footer;
