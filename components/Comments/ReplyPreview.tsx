"use client";

import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { CommentValue } from ".";

const ReplyPreview: React.FC = () => {
  const { watch } = useFormContext<CommentValue>();
  const pathname = usePathname();

  return (
    <>
      <div className="text-sm sm:text-base">
        你正在回复：{" "}
        <a
          className="transition-colors hover:text-pink"
          href={`${pathname}#${watch("replyId")}`}
        >
          {watch("replyNick")}
        </a>
      </div>
      <div className="comments-content mt-4 w-full rounded-md bg-red-50 px-2 py-4 sm:px-4">
        <p className="whitespace-pre-wrap text-justify text-sm/6 sm:text-base/7">
          {watch("replyContent")}
        </p>
      </div>
    </>
  );
};

export default ReplyPreview;
