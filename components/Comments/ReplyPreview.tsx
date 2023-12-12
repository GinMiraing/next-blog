"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { CommentValue } from ".";

const ReplyPreview: React.FC = () => {
  const { watch, setValue } = useFormContext<CommentValue>();
  const pathname = usePathname();

  const cancelReply = useCallback(() => {
    setValue("replyId", 0);
    setValue("replyNick", "");
    setValue("replyContent", "");
    setValue("parentId", 0);
  }, []);

  return (
    <div
      className={cn("w-full", {
        hidden: !watch("replyNick"),
      })}
    >
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span>
          你正在回复：{" "}
          <a
            className="transition-colors hover:text-pink"
            href={`${pathname}#${watch("replyId")}`}
          >
            {watch("replyNick")}
          </a>
        </span>
        <button
          onClick={() => cancelReply()}
          className="transition-colors hover:text-pink"
        >
          取消
        </button>
      </div>
      <div className="comments-content mt-4 w-full rounded-md bg-red-50 px-2 py-4 sm:px-4">
        <p className="whitespace-pre-wrap text-justify text-sm/6 sm:text-base/7">
          {watch("replyContent")}
        </p>
      </div>
    </div>
  );
};

export default ReplyPreview;
