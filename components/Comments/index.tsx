"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
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

const Comments = () => {
  const [refresh, setRefresh] = useState(true);

  return (
    <div className="py-4">
      <h2 className="inline-block bg-red-100 px-2 text-lg">评论</h2>
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

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          {replyData.isReply && (
            <>
              <div>
                你正在回复：{" "}
                <a
                  className="transition-colors hover:text-pink"
                  href={`${pathname}#${replyData.replyId}`}
                >
                  {replyData.nick}
                </a>
              </div>
              <div
                className="mt-4 border-l-4 border-pink pl-4"
                dangerouslySetInnerHTML={{
                  __html: `<p>${replyData.content.replace(/\n/g, "<br/>")}</p>`,
                }}
              ></div>
            </>
          )}
          <textarea
            id="content"
            className="mt-4 min-h-[6rem] w-full whitespace-pre rounded-sm border p-2 outline-none"
            {...register("content")}
          ></textarea>
        </div>
        <div className="mt-4 flex w-full">
          <div className="grid w-full grid-cols-1 gap-4">
            <div className="flex items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center bg-gray-100 px-4 text-sm">
                <label>
                  昵称<span className="text-red-500">*</span>
                </label>
              </div>
              <input
                className="w-10 grow rounded-sm border px-2 py-1 outline-none"
                type="text"
                {...register("nick")}
              />
            </div>
            <div className="flex items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20 shrink-0 items-center justify-center bg-gray-100 px-4 text-sm">
                <label>
                  邮箱<span className="text-red-500">*</span>
                </label>
              </div>
              <input
                className="w-10 grow border px-2 py-1 outline-none placeholder:text-sm"
                placeholder="用于邮件通知"
                type="text"
                {...register("email")}
              />
            </div>
            <div className="flex items-center overflow-hidden rounded-sm">
              <div className="flex h-full w-20  shrink-0 items-center justify-center bg-gray-100 px-4 text-sm">
                <label>网站</label>
              </div>
              <input
                className="w-10 grow rounded-sm border px-2 py-1 outline-none placeholder:text-sm"
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

  const replyBtnHandler = () => {
    setReplyData({
      isReply: true,
      nick: comment.nick,
      parentId: comment.id,
      replyId: comment.id,
      content: comment.content,
    });
    const contentDOM = document.getElementById("content");
    if (contentDOM) {
      contentDOM.focus();
    }
  };

  return (
    <>
      <div
        className="w-full"
        id={comment.id.toString()}
      >
        <div className="flex w-full">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full shadow">
            <img
              src={`https://cravatar.cn/avatar/${comment.emailMd5}`}
              alt={comment.emailMd5}
              loading="lazy"
            />
          </div>
          <div className="ml-4 flex grow flex-col">
            <div className="flex items-center">
              {comment.link ? (
                <a
                  className="text-lg transition-colors hover:text-pink"
                  href={comment.link}
                  target="_blank"
                >
                  {comment.nick}
                </a>
              ) : (
                <div className="text-xl">{comment.nick}</div>
              )}
              <div className="ml-4 text-xs">
                <div>{comment.formatTime}</div>
              </div>
            </div>
            <div
              className="my-3 w-full rounded-md bg-red-50 px-2 py-4"
              dangerouslySetInnerHTML={{
                __html: `<p>${comment.content.replace(/\n/g, "<br/>")}</p>`,
              }}
            ></div>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  setShow(
                    show === "init"
                      ? "show"
                      : show === "show"
                      ? "hide"
                      : "show",
                  )
                }
                className={cn("transition-colors hover:text-pink", {
                  invisible: comment.reply === 0,
                })}
              >
                {show === "init" || show === "hide"
                  ? `展开回复（${comment.reply}）`
                  : "收起回复"}
              </button>
              <button
                onClick={() => replyBtnHandler()}
                className="transition-colors hover:text-pink"
              >
                回复
              </button>
            </div>
          </div>
        </div>
      </div>
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
  const pathname = usePathname();
  const { setReplyData } = useComments();

  const replyBtnHandler = () => {
    setReplyData({
      isReply: true,
      nick: comment.nick,
      parentId: parentId,
      replyId: comment.id,
      content: comment.content,
    });
    const contentDOM = document.getElementById("content");
    if (contentDOM) {
      contentDOM.focus();
    }
  };

  return (
    <div
      className="w-full"
      id={comment.id.toString()}
    >
      <div className="flex w-full">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full shadow">
          <img
            src={`https://cravatar.cn/avatar/${comment.emailMd5}`}
            alt={comment.emailMd5}
            loading="lazy"
          />
        </div>
        <div className="ml-4 flex grow flex-col">
          <div className="flex items-center">
            {comment.link ? (
              <a
                className="text-lg transition-colors hover:text-pink"
                href={comment.link}
                target="_blank"
              >
                {comment.nick}
              </a>
            ) : (
              <div className="text-xl">{comment.nick}</div>
            )}
            <div className="ml-4 text-xs">
              <div>{comment.formatTime}</div>
            </div>
          </div>
          <div
            className="my-3 w-full rounded-md bg-red-50 px-2 py-4"
            dangerouslySetInnerHTML={{
              __html: `<p>${
                comment.replyNick &&
                `<a class="hover:text-pink bg-yellow-200 transition-colors" href="${pathname}#${comment.replyId}">@${comment.replyNick}</a> `
              }${comment.content.replace(/\n/g, "<br/>")}</p>`,
            }}
          ></div>
          <div className="flex justify-end">
            <button
              onClick={() => replyBtnHandler()}
              className="transition-colors hover:text-pink"
            >
              回复
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
