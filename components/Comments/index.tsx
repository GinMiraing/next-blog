"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { CommentType } from "@/lib/types";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentList from "./CommentList";
import ReplyPreview from "./ReplyPreview";

const CommentSchema = z.object({
  content: z.string().min(1, { message: "评论内容不能为空" }).max(200),
  nick: z.string().min(1, { message: "昵称不能为空" }),
  email: z
    .string()
    .min(1, { message: "邮箱不能为空" })
    .email({ message: "邮箱格式不正确" }),
  link: z.union([
    z.string().url({ message: "链接格式不正确" }),
    z.string().length(0),
  ]),
  parentId: z.number().optional(),
  replyId: z.number().optional(),
  replyNick: z.string().optional(),
  replyContent: z.string().optional(),
});

export type CommentValue = z.infer<typeof CommentSchema>;

const Comments: React.FC = () => {
  const form = useForm<CommentValue>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      nick: "",
      email: "",
      link: "",
      content: "",
    },
  });

  const [refresh, setRefresh] = useState(false);

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
        <CommentForm setRefresh={setRefresh} />
        <CommentsList refresh={refresh} />
      </FormProvider>
    </div>
  );
};

const CommentsList: React.FC<{ refresh: boolean }> = ({ refresh }) => {
  const pathname = usePathname();
  const { setValue, setFocus } = useFormContext<CommentValue>();

  const [loading, setLoading] = useState<"wait" | "loading" | "success">(
    "wait",
  );
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchComments = async () => {
    try {
      setLoading("loading");
      const res = await axios.get<{
        message: string;
        data: CommentType[];
        isError: boolean;
      }>(`/api/comments`, {
        params: {
          path: pathname,
        },
      });

      setComments(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading("success");
    }
  };

  const replyBtnHandler = ({
    replyId,
    replyNick,
    replyContent,
    parentId,
  }: {
    replyId: number;
    replyNick: string;
    replyContent: string;
    parentId: number;
  }) => {
    setValue("replyId", replyId);
    setValue("replyNick", replyNick);
    setValue("replyContent", replyContent);
    setValue("parentId", parentId);

    setFocus("content");
  };

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  if (loading === "wait" || loading === "loading") {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="mr-2 animate-spin text-pink" />
        评论正在加载中...
      </div>
    );
  }

  if (loading === "success" && comments.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        暂无评论
      </div>
    );
  }

  return (
    <CommentList divider>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="py-4"
        >
          <CommentItem
            pathname={pathname}
            item={comment}
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md hover:cursor-pointer">
              <Image
                src={`https://cravatar.cn/avatar/${comment.emailMd5}`}
                alt={comment.emailMd5}
                className="h-full w-full object-cover object-center"
                layout="fill"
                onClick={() =>
                  replyBtnHandler({
                    replyId: comment.id,
                    replyNick: comment.nick,
                    replyContent: comment.content,
                    parentId: comment.id,
                  })
                }
              />
            </div>
          </CommentItem>
          {comment.replyList.length > 0 && (
            <div className="ml-14 mt-6">
              <CommentList>
                {comment.replyList.map((reply) => (
                  <div key={reply.id}>
                    <CommentItem
                      pathname={pathname}
                      item={reply}
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md hover:cursor-pointer">
                        <Image
                          src={`https://cravatar.cn/avatar/${reply.emailMd5}`}
                          alt={reply.emailMd5}
                          className="h-full w-full object-cover object-center"
                          layout="fill"
                          onClick={() =>
                            replyBtnHandler({
                              replyId: reply.id,
                              replyNick: reply.nick,
                              replyContent: reply.content,
                              parentId: comment.id,
                            })
                          }
                        />
                      </div>
                    </CommentItem>
                  </div>
                ))}
              </CommentList>
            </div>
          )}
        </div>
      ))}
    </CommentList>
  );
};

export default Comments;
