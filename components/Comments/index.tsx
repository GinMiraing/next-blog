"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { MainCommentType, ReplyCommentType } from "@/lib/types";
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

const CommentsContext = createContext<{
  replyData: {
    isReply: boolean;
    nick: string;
    parentId: number;
    replyId: number;
    content: string;
  };
  setReplyData: React.Dispatch<
    React.SetStateAction<{
      isReply: boolean;
      nick: string;
      parentId: number;
      replyId: number;
      content: string;
    }>
  >;
}>({
  replyData: { isReply: false, nick: "", parentId: 0, replyId: 0, content: "" },
  setReplyData: () => {},
});

const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [replyData, setReplyData] = useState<{
    isReply: boolean;
    nick: string;
    parentId: number;
    replyId: number;
    content: string;
  }>({
    isReply: false,
    nick: "",
    parentId: 0,
    replyId: 0,
    content: "",
  });
  return (
    <CommentsContext.Provider value={{ replyData, setReplyData }}>
      {children}
    </CommentsContext.Provider>
  );
};

const replyBtnHandler = (
  setReplyData: React.Dispatch<
    React.SetStateAction<{
      isReply: boolean;
      nick: string;
      parentId: number;
      replyId: number;
      content: string;
    }>
  >,
  comment: MainCommentType | ReplyCommentType,
  parenId: number,
) => {
  setReplyData({
    isReply: true,
    nick: comment.nick,
    parentId: parenId,
    replyId: comment.id,
    content: comment.content,
  });
  const contentDOM = document.getElementById("content");
  if (contentDOM) {
    contentDOM.focus();
  }
};

const Comments: React.FC = () => {
  const [refresh, setRefresh] = useState(true);

  return (
    <div className="comments py-4">
      <h2 className="inline-block bg-red-100 px-2 text-lg dark:bg-neutral-800">
        评论
      </h2>
      <CommentsProvider>
        <CommentsInputForm setRefresh={setRefresh} />
        <ParentCommentsList refresh={refresh} />
      </CommentsProvider>
    </div>
  );
};

const CommentsInputForm: React.FC<{
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRefresh }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
  const { replyData, setReplyData } = useComments();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentValue> = async (data) => {
    setLoading(true);
    const { nick, email, link, content } = data;

    try {
      if (replyData.isReply) {
        await axios({
          method: "POST",
          url: "/api/replycomment",
          data: {
            nick,
            email,
            link,
            content,
            path: pathname,
            parentId: replyData.parentId,
            replyId: replyData.replyId,
            replyNick: replyData.nick,
          },
        });
        setReplyData({
          isReply: false,
          nick: "",
          parentId: 0,
          replyId: 0,
          content: "",
        });
      } else {
        await axios({
          method: "POST",
          url: "/api/maincomment",
          data: {
            nick,
            email,
            link,
            content,
            path: pathname,
          },
        });
      }
      reset();
      setRefresh((prev) => !prev);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const textareaInputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "0px";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    <div className="my-6 flex flex-col">
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
              <div
                className="mt-4 border-l-4 border-pink pl-4 text-sm sm:text-base"
                dangerouslySetInnerHTML={{
                  __html: `<p>${replyData.content.replace(/\n/g, "<br/>")}</p>`,
                }}
              ></div>
            </>
          )}
          <textarea
            placeholder="请填写评论内容"
            id="content"
            onInput={(e) => textareaInputHandler(e)}
            className="mt-4 h-10 w-full overflow-hidden whitespace-pre-wrap rounded-sm border p-2 text-sm/6 outline-none placeholder:text-xs/6 dark:border-neutral-800 dark:bg-neutral-800 sm:text-base sm:placeholder:text-sm/6"
            {...register("content")}
          ></textarea>
        </div>
        <div className="mt-4 flex w-full">
          <div className="grid w-full grid-cols-1 gap-4">
            <div className="flex items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center bg-gray-100 px-4 text-sm dark:bg-stone-600">
                <label>
                  昵称<span className="text-red-500">*</span>
                </label>
              </div>
              <input
                className="w-10 grow border px-2 py-1 text-sm outline-none dark:border-neutral-800 dark:bg-neutral-800 sm:text-base"
                type="text"
                {...register("nick")}
              />
            </div>
            <div className="flex items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center bg-gray-100 px-4 text-sm dark:bg-stone-600">
                <label>
                  邮箱<span className="text-red-500">*</span>
                </label>
              </div>
              <input
                className="w-10 grow border px-2 py-1 text-sm outline-none placeholder:text-xs dark:border-neutral-800 dark:bg-neutral-800 sm:text-base sm:placeholder:text-sm"
                placeholder="用于邮件通知"
                type="text"
                {...register("email")}
              />
            </div>
            <div className="flex items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20  shrink-0 items-center justify-center bg-gray-100 px-4 text-sm dark:bg-stone-600">
                <label>网站</label>
              </div>
              <input
                className="w-10 grow border px-2 py-1 text-sm outline-none placeholder:text-sm dark:border-neutral-800 dark:bg-neutral-800 sm:text-base"
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

const ParentCommentsList: React.FC<{
  refresh: boolean;
}> = ({ refresh }) => {
  const [loading, setLoading] = useState<"wait" | "loading" | "success">(
    "wait",
  );
  const [commentList, setCommentList] = useState<MainCommentType[]>([]);
  const pathname = usePathname();

  const fetchMainComments = async () => {
    try {
      setLoading("loading");
      await sleep(1000);
      const res = await axios<{
        data: MainCommentType[];
      }>({
        method: "GET",
        url: "/api/maincomment",
        params: {
          path: pathname,
        },
      });

      setCommentList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("success");
    }
  };

  useEffect(() => {
    fetchMainComments();
  }, [refresh]);

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
    <div className="space-y-4">
      {commentList.map((comment) => (
        <ParentCommentsItem
          comment={comment}
          key={comment.id}
        />
      ))}
    </div>
  );
};

const ParentCommentsItem: React.FC<{ comment: MainCommentType }> = ({
  comment,
}) => {
  const [show, setShow] = useState<"show" | "hide" | "init">("init");
  const { setReplyData } = useComments();

  return (
    <>
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
            onClick={() => replyBtnHandler(setReplyData, comment, comment.id)}
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
    </>
  );
};

const ReplyCommentsList: React.FC<{ parentId: number }> = ({ parentId }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState<"wait" | "loading" | "success">(
    "wait",
  );
  const [replyList, setReplyList] = useState<ReplyCommentType[]>([]);

  const fetchReplyComments = async () => {
    try {
      setLoading("loading");
      await sleep(1000);
      const res = await axios<{
        data: ReplyCommentType[];
      }>({
        method: "GET",
        url: "/api/replycomment",
        params: {
          parentId,
          path: pathname,
        },
      });

      setReplyList(res.data.data);
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

  return (
    <>
      {replyList.map((reply) => (
        <ReplyCommentsItem
          parentId={parentId}
          comment={reply}
          key={reply.id}
        />
      ))}
    </>
  );
};

const ReplyCommentsItem: React.FC<{
  comment: ReplyCommentType;
  parentId: number;
}> = ({ comment, parentId }) => {
  const { setReplyData } = useComments();

  return (
    <BaseCommentItem comment={comment}>
      <div className="flex justify-end text-sm sm:text-base">
        <button
          onClick={() => replyBtnHandler(setReplyData, comment, parentId)}
          className="hover:text-pink"
        >
          回复
        </button>
      </div>
    </BaseCommentItem>
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
      className="w-full"
      id={comment.id.toString()}
    >
      <div className="flex w-full">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border-2 bg-blue-100 dark:border-stone-400 dark:bg-neutral-500">
          <Image
            src={`https://cravatar.cn/avatar/${comment.emailMd5}`}
            alt={comment.emailMd5}
            className="h-full w-full object-cover object-center"
            layout="fill"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="ml-4 flex w-full flex-col overflow-hidden">
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
          <div
            className="comments-content my-3 w-full rounded-md bg-red-50 px-2 py-4 dark:bg-stone-600 sm:px-4"
            dangerouslySetInnerHTML={
              comment.replyNick
                ? {
                    __html: `<p>${
                      comment.replyNick &&
                      `<a class="hover:text-pink bg-yellow-200 dark:bg-yellow-600" href="${pathname}#${comment.replyId}">@${comment.replyNick}</a> `
                    }${comment.content.replace(/\n/g, "<br/>")}</p>`,
                  }
                : {
                    __html: `<p>${comment.content.replace(/\n/g, "<br/>")}</p>`,
                  }
            }
          ></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Comments;
