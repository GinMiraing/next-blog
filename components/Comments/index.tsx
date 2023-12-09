"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  createComment,
  createReply,
  getAllCommentsByPath,
  getAuthKey,
  getRepliesByParentId,
} from "@/lib/axios";
import { FormatedComment, FormatedReply } from "@/lib/types";
import { cn, sleep } from "@/lib/utils";

const commentSchema = z.object({
  nick: z.string().min(1, { message: "昵称不能为空" }),
  email: z
    .string()
    .min(1, { message: "邮箱不能为空" })
    .email({ message: "邮箱格式不正确" }),
  link: z.union([
    z.string().url({ message: "链接格式不正确" }).nullable(),
    z.literal(""),
  ]),
  content: z.string().min(1, { message: "评论内容不能为空" }).max(200),
});

type CommentValue = z.infer<typeof commentSchema>;

type CommentFormData = {
  isReply: boolean;
  nick?: string;
  parentId: number;
  replyId: number;
  content?: string;
};

const CommentFormContext = createContext<{
  data: CommentFormData;
  setData: React.Dispatch<React.SetStateAction<CommentFormData>>;
} | null>(null);

const useCommentFormContext = () => {
  const context = useContext(CommentFormContext);

  if (!context) {
    throw new Error("CommentFormContext not found");
  }

  return context;
};

const Comments: React.FC = () => {
  const [formData, setFormData] = useState<CommentFormData>({
    isReply: false,
    nick: "",
    parentId: 0,
    replyId: 0,
    content: "",
  });
  const [reloading, setReloading] = useState(false);

  return (
    <div className="comments space-y-6">
      <div className="flex items-center justify-between">
        <hr className="w-full border-t border-dashed border-slate-300" />
        <h2 className="mx-4 shrink-0 rounded bg-red-100 px-2 text-center font-medium text-lg">
          读者评论
        </h2>
        <hr className="w-full border-t border-dashed border-slate-300" />
      </div>
      <CommentFormContext.Provider
        value={{ data: formData, setData: setFormData }}
      >
        <CommentsInputForm setReloading={setReloading} />
        <ParentCommentsList reloading={reloading} />
      </CommentFormContext.Provider>
    </div>
  );
};

const CommentsInputForm: React.FC<{
  setReloading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setReloading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CommentValue>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      nick: "",
      email: "",
      link: "",
      content: "",
    },
  });
  const pathname = usePathname();
  const { data: replyData, setData } = useCommentFormContext();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentValue> = async (data) => {
    window.localStorage.setItem(
      "comment_metadata",
      JSON.stringify({
        nick: data.nick,
        email: data.email,
        link: data.link,
      }),
    );
    setLoading(true);
    const { nick, email, link, content } = data;

    try {
      const authKey = await getAuthKey();

      if (replyData.isReply) {
        await createReply({
          data: {
            nick,
            email,
            link: link ? link : "",
            content,
            parentId: replyData.parentId,
            replyId: replyData.replyId,
          },
          authKey,
        });
        setData({
          isReply: false,
          nick: "",
          parentId: 0,
          replyId: 0,
          content: "",
        });
      } else {
        await createComment({
          data: {
            nick,
            email,
            link: link ? link : "",
            content,
            path: pathname,
          },
          authKey,
        });
      }
      reset({
        content: "",
      });
      setReloading((prev) => !prev);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const textareaInputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "0px";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 56}px`;
  };

  useEffect(() => {
    const commentMetadata = window.localStorage.getItem("comment_metadata");

    try {
      if (commentMetadata) {
        const { nick, email, link } = JSON.parse(commentMetadata);
        setValue("nick", nick);
        setValue("email", email);
        setValue("link", link);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          {replyData.isReply && (
            <>
              <div className="text-sm sm:text-base">
                你正在回复：{" "}
                <a
                  className="hover:text-pink"
                  href={`${pathname}#${replyData.replyId}`}
                >
                  {replyData.nick}
                </a>
              </div>
              <div className="comments-content mt-4 w-full rounded-md bg-red-50 px-2 py-4 sm:px-4">
                <p className="whitespace-pre-wrap text-justify text-sm/6 sm:text-base/7">
                  {replyData.content}
                </p>
              </div>
            </>
          )}
          <textarea
            placeholder="请填写评论内容"
            id="content"
            onInput={(e) => textareaInputHandler(e)}
            className="mt-4 h-24 w-full resize-none overflow-hidden whitespace-pre-wrap rounded-md border border-neutral-200 bg-gray-50 p-2 text-sm/6 outline-none placeholder:text-xs/6 focus:border-rose-300 sm:text-base sm:placeholder:text-sm/6"
            {...register("content")}
          ></textarea>
        </div>
        <div className="mt-4 flex w-full">
          <div className="grid w-full grid-cols-1 gap-4">
            <div className="flex h-12 items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center rounded-l-md border border-r-0 px-4 text-sm">
                <label>
                  昵称<span className="text-red-500">*</span>
                </label>
              </div>
              <input
                className="h-full w-10 grow rounded-r-md border bg-gray-50 px-2 py-1 text-sm outline-none focus:border-rose-300 sm:text-base"
                type="text"
                {...register("nick")}
              />
            </div>
            <div className="flex h-12 items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center rounded-l-md border border-r-0 px-4 text-sm">
                <label>
                  邮箱<span className="text-red-500">*</span>
                </label>
              </div>
              <input
                className="h-full w-10 grow rounded-r-md border bg-gray-50 px-2 py-1 text-sm outline-none focus:border-rose-300 sm:text-base sm:placeholder:text-sm"
                placeholder="用于邮件通知"
                type="text"
                {...register("email")}
              />
            </div>
            <div className="flex h-12 items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center rounded-l-md border border-r-0 px-4 text-sm">
                <label>网站</label>
              </div>
              <input
                className="h-full w-10 grow rounded-r-md border bg-slate-50 px-2 py-1 text-sm outline-none focus:border-red-500 sm:text-base sm:placeholder:text-sm"
                type="text"
                {...register("link")}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-red-500">
            {errors.content
              ? errors.content.message
              : errors.nick
              ? errors.nick.message
              : errors.email
              ? errors.email.message
              : errors.link
              ? errors.link.message
              : ""}
          </div>
          <button
            disabled={loading}
            className="rounded bg-pink px-4 py-2 text-white hover:opacity-70"
            type="submit"
          >
            {loading ? <Loader2 className="animate-spin" /> : "提交"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ParentCommentsList: React.FC<{ reloading: boolean }> = ({
  reloading,
}) => {
  const [loading, setLoading] = useState<"wait" | "loading" | "success">(
    "wait",
  );
  const [commentList, setCommentList] = useState<FormatedComment[]>([]);
  const pathname = usePathname();

  const fetchMainComments = async () => {
    try {
      setLoading("loading");
      await sleep(1000);
      setCommentList(
        await getAllCommentsByPath({
          path: pathname,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("success");
    }
  };

  useEffect(() => {
    fetchMainComments();
  }, [reloading]);

  if (loading === "loading") {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="mr-2 animate-spin text-pink" />
        评论正在加载中...
      </div>
    );
  }

  if (commentList.length === 0 && loading === "success") {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        暂无评论
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {commentList.map((comment) => (
        <ParentCommentsItem
          comment={comment}
          key={comment.id}
        />
      ))}
    </div>
  );
};

const ParentCommentsItem: React.FC<{ comment: FormatedComment }> = ({
  comment,
}) => {
  const { setData } = useCommentFormContext();
  const [show, setShow] = useState<"show" | "hide" | "init">("init");

  const replyBtnHandler = ({
    comment,
    parentId,
  }: {
    comment: FormatedComment;
    parentId: number;
  }) => {
    setData({
      isReply: true,
      nick: comment.nick,
      parentId,
      replyId: comment.id,
      content: comment.content,
    });
    const contentDOM = document.getElementById("content");
    if (contentDOM) {
      contentDOM.focus();
    }
  };

  return (
    <div>
      <BaseCommentItem comment={comment}>
        <div className="flex justify-between text-sm sm:text-base">
          <button
            onClick={() =>
              setShow(
                show === "init" ? "show" : show === "show" ? "hide" : "show",
              )
            }
            className={cn("hover:text-pink", {
              invisible: comment.reply === 0,
            })}
          >
            {show === "init" || show === "hide"
              ? `展开回复（${comment.reply}）`
              : "收起回复"}
          </button>
          <button
            onClick={() => replyBtnHandler({ comment, parentId: comment.id })}
            className="hover:text-pink"
          >
            回复
          </button>
        </div>
      </BaseCommentItem>
      {show !== "init" && (
        <div
          className={cn("ml-14 mt-6 space-y-4", {
            hidden: show === "hide",
          })}
        >
          <ReplyCommentsList parentId={comment.id} />
        </div>
      )}
    </div>
  );
};

const ReplyCommentsList: React.FC<{ parentId: number }> = ({ parentId }) => {
  const [loading, setLoading] = useState<"wait" | "loading" | "success">(
    "wait",
  );
  const [replyList, setReplyList] = useState<FormatedReply[]>([]);

  const fetchReplyComments = async () => {
    try {
      setLoading("loading");
      await sleep(1000);
      setReplyList(await getRepliesByParentId({ parentId }));
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

  if (replyList.length === 0 && loading === "success") {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        暂无评论
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {replyList.map((reply) => (
        <ReplyCommentsItem
          parentId={parentId}
          comment={reply}
          key={reply.id}
        />
      ))}
    </div>
  );
};

const ReplyCommentsItem: React.FC<{
  comment: FormatedReply;
  parentId: number;
}> = ({ comment, parentId }) => {
  const { setData } = useCommentFormContext();

  const replyBtnHandler = ({
    comment,
    parentId,
  }: {
    comment: FormatedReply;
    parentId: number;
  }) => {
    setData({
      isReply: true,
      nick: comment.nick,
      parentId,
      replyId: comment.id,
      content: comment.content,
    });
    const contentDOM = document.getElementById("content");
    if (contentDOM) {
      contentDOM.focus();
    }
  };

  return (
    <div>
      <BaseCommentItem comment={comment}>
        <div className="flex justify-end text-sm sm:text-base">
          <button
            onClick={() => replyBtnHandler({ comment, parentId })}
            className="hover:text-pink"
          >
            回复
          </button>
        </div>
      </BaseCommentItem>
    </div>
  );
};

const BaseCommentItem: React.FC<{
  children: React.ReactNode;
  comment: {
    id: number;
    nick: string;
    emailMd5: string;
    link: string;
    content: string;
    isAdmin: boolean;
    isHidden: boolean;
    reply?: number;
    replyId?: number;
    replyNick?: string;
  };
}> = ({ children, comment }) => {
  const pathname = usePathname();

  return (
    <div
      className="-mt-20 w-full pt-20"
      id={comment.id.toString()}
    >
      <div className="flex w-full">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
          <Image
            src={`https://cravatar.cn/avatar/${comment.emailMd5}`}
            alt={comment.emailMd5}
            className="h-full w-full object-cover object-center"
            layout="fill"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="ml-4 flex w-full flex-col space-y-3 overflow-hidden">
          <div className="no-scrollbar flex items-center space-x-2 overflow-scroll sm:space-x-3">
            {comment.link ? (
              <a
                className="whitespace-nowrap text-lg hover:text-pink"
                href={comment.link}
                target="_blank"
              >
                {comment.nick}
              </a>
            ) : (
              <div className="whitespace-nowrap text-lg">{comment.nick}</div>
            )}
            <div className="whitespace-nowrap text-xs">
              <div>{dayjs(comment.id).format("YYYY-MM-DD HH:mm:ss")}</div>
            </div>
            {comment.isAdmin && (
              <div className="whitespace-nowrap rounded-md bg-blue-100 px-1.5 text-sm dark:bg-pink">
                博主
              </div>
            )}
          </div>
          <div className="comments-content w-full rounded-md bg-red-50 px-2 py-4 sm:px-4">
            <p className="whitespace-pre-wrap text-justify text-sm/6 sm:text-base/7">
              {comment.replyNick && (
                <a
                  className="mr-2 bg-yellow-200 hover:text-pink dark:bg-yellow-600"
                  href={`${pathname}#${comment.replyId}`}
                >
                  @{comment.replyNick}
                </a>
              )}
              {comment.content}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Comments;
