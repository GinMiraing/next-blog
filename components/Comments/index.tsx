"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { getRepliesByParentId } from "@/lib/axios";
import { FormatedComment, FormatedReply } from "@/lib/types";
import { cn, sleep } from "@/lib/utils";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentList from "./CommentList";
import ReplyPreview from "./ReplyPreview";

const CommentSchema = z.object({
  nick: z.string().min(1, { message: "昵称不能为空" }),
  email: z
    .string()
    .min(1, { message: "邮箱不能为空" })
    .email({ message: "邮箱格式不正确" }),
  link: z.union([
    z.string().url({ message: "链接格式不正确" }),
    z.string().length(0),
  ]),
  content: z.string().min(1, { message: "评论内容不能为空" }).max(200),
  parentId: z.number().optional(),
  replyId: z.number().optional(),
  replyNick: z.string().optional(),
  replyContent: z.string().optional(),
});

export type CommentValue = z.infer<typeof CommentSchema>;

const Comments: React.FC<{
  data: FormatedComment[];
}> = ({ data }) => {
  const form = useForm<CommentValue>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      nick: "",
      email: "",
      link: "",
      content: "",
    },
  });

  return (
    <div className="comments space-y-6">
      <div className="flex items-center justify-between">
        <hr className="w-full border-t border-dashed border-slate-300" />
        <h2 className="mx-4 shrink-0 rounded bg-red-100 px-2 text-center font-medium text-lg">
          读者评论
        </h2>
        <hr className="w-full border-t border-dashed border-slate-300" />
      </div>
      <FormProvider {...form}>
        <ReplyPreview />
        <CommentForm />
        <ParentComments data={data} />
      </FormProvider>
    </div>
  );
};

const ParentComments: React.FC<{
  data: FormatedComment[];
}> = ({ data }) => {
  const pathname = usePathname();
  const { setValue, setFocus } = useFormContext<CommentValue>();

  const [replyState, setReplyState] = useState<"beforeLoad" | "show" | "hide">(
    "beforeLoad",
  );

  const replyBtnHandler = ({ comment }: { comment: FormatedComment }) => {
    setValue("replyId", comment.id);
    setValue("replyNick", comment.nick);
    setValue("replyContent", comment.content);
    setValue("parentId", comment.id);

    setFocus("content");
  };

  if (data.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        暂无评论
      </div>
    );
  }

  return (
    <CommentList>
      {data.map((comment) => (
        <div key={comment.id}>
          <CommentItem
            pathname={pathname}
            item={comment}
          >
            <div className="flex items-center justify-between text-sm sm:text-base">
              <button
                onClick={() =>
                  setReplyState(
                    replyState === "beforeLoad"
                      ? "show"
                      : replyState === "show"
                      ? "hide"
                      : "show",
                  )
                }
                className={cn("transition-colors hover:text-pink", {
                  invisible: comment.reply === 0,
                })}
              >
                {replyState === "beforeLoad" || replyState === "hide"
                  ? `展开回复（${comment.reply}）`
                  : "收起回复"}
              </button>
              <button
                onClick={() => replyBtnHandler({ comment })}
                className="transition-colors hover:text-pink"
              >
                回复
              </button>
            </div>
          </CommentItem>
          {replyState !== "beforeLoad" && (
            <div
              className={cn("ml-14 mt-6", {
                hidden: replyState === "hide",
              })}
            >
              <ReplyComments parentId={comment.id} />
            </div>
          )}
        </div>
      ))}
    </CommentList>
  );
};

const ReplyComments: React.FC<{ parentId: number }> = ({ parentId }) => {
  const pathname = usePathname();
  const { setValue, setFocus } = useFormContext<CommentValue>();

  const [loading, setLoading] = useState<"wait" | "loading" | "success">(
    "wait",
  );
  const [replies, setReplies] = useState<FormatedReply[]>([]);

  const replyBtnHandler = ({ reply }: { reply: FormatedReply }) => {
    setValue("replyId", reply.id);
    setValue("replyNick", reply.nick);
    setValue("replyContent", reply.content);
    setValue("parentId", parentId);

    setFocus("content");
  };

  const fetchReplyComments = async () => {
    try {
      setLoading("loading");
      await sleep(1000);
      setReplies(await getRepliesByParentId({ parentId }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("success");
    }
  };

  useEffect(() => {
    fetchReplyComments();
  }, []);

  if (loading === "wait" || loading === "loading") {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="mr-2 animate-spin text-pink" />
        评论正在加载中...
      </div>
    );
  }

  if (replies.length === 0 && loading === "success") {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        暂无评论
      </div>
    );
  }

  return (
    <CommentList>
      {replies.map((reply) => (
        <div key={reply.id}>
          <CommentItem
            pathname={pathname}
            item={reply}
          >
            <div className="flex items-center justify-end text-sm sm:text-base">
              <button
                onClick={() => replyBtnHandler({ reply })}
                className="transition-colors hover:text-pink"
              >
                回复
              </button>
            </div>
          </CommentItem>
        </div>
      ))}
    </CommentList>
  );
};

export default Comments;
