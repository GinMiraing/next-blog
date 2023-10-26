"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { CommentType } from "@/lib/types";
import { cn } from "@/lib/utils";

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
    nick: string;
    parentId: number;
    replyId: number;
    content: string;
  };
  setReplyData: React.Dispatch<
    React.SetStateAction<{
      nick: string;
      parentId: number;
      replyId: number;
      content: string;
    }>
  >;
}>({
  replyData: { nick: "", parentId: 0, replyId: 0, content: "" },
  setReplyData: () => {},
});

const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [replyData, setReplyData] = useState<{
    nick: string;
    parentId: number;
    replyId: number;
    content: string;
  }>({
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
  return (
    <div>
      <CommentsProvider>
        <CommentsInputForm />
        <CommentsList />
      </CommentsProvider>
    </div>
  );
};

const CommentsInputForm = () => {
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
      await axios({
        method: "POST",
        url: "/api/comment",
        data: {
          nick,
          email,
          link,
          content,
          parentId: replyData.parentId,
          replyId: replyData.replyId,
          replyNick: replyData.nick,
          path: pathname,
        },
      });
      reset();
      setReplyData({ nick: "", parentId: 0, replyId: 0, content: "" });
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
          {replyData.nick && (
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

const CommentsList = () => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/comment",
        });

        setCommentList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);
  return (
    <div className="space-y-4">
      {commentList.map((comment) => (
        <CommentsParentsItem
          comment={comment}
          key={comment.id}
        />
      ))}
    </div>
  );
};

const CommentsParentsItem: React.FC<{ comment: CommentType }> = ({
  comment,
}) => {
  const [replyComments, setReplyComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchReplyComments = async () => {
    setLoading(true);

    try {
      const res = await axios<{ data: CommentType[] }>({
        method: "GET",
        url: "/api/comment",
        params: {
          parentId: comment.id,
        },
      });

      setReplyComments(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const replyBtnHandler = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    fetchReplyComments();
  }, []);

  return (
    <>
      <CommentsItem
        parentId={comment.id}
        comment={comment}
      />
      {replyComments.length > 0 && (
        <button onClick={replyBtnHandler}>
          {show ? "收起回复" : "展开回复"}
        </button>
      )}
      <div
        className={cn("ml-6", {
          hidden: !show,
        })}
      >
        {replyComments.map((reply) => (
          <CommentsItem
            comment={reply}
            key={reply.id}
            parentId={comment.id}
          />
        ))}
      </div>
    </>
  );
};

const CommentsItem: React.FC<{ comment: CommentType; parentId?: number }> = ({
  comment,
  parentId,
}) => {
  const pathname = usePathname();
  const { setReplyData } = useComments();
  const replyBtnHandler = () => {
    setReplyData({
      nick: comment.nick,
      parentId: parentId ? parentId : 0,
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
      <div className="flex w-full items-center">
        <div className="h-10 w-10 overflow-hidden rounded-full shadow">
          <img
            src={`https://cravatar.cn/avatar/${comment.emailMd5}`}
            alt={comment.emailMd5}
            loading="lazy"
          />
        </div>
        {comment.link ? (
          <a
            className="ml-4 text-lg transition-colors hover:text-pink"
            href={comment.link}
            target="_blank"
          >
            {comment.nick}
          </a>
        ) : (
          <div className="ml-4 text-xl">{comment.nick}</div>
        )}
        <div className="ml-4 text-xs">
          <div>{comment.formatTime}</div>
        </div>
      </div>
      <div
        className="w-full p-6"
        dangerouslySetInnerHTML={{
          __html: `<p>${
            comment.replyNick &&
            `<a class="hover:text-pink bg-red-100 transition-colors" href="${pathname}#${comment.replyId}">@${comment.replyNick}</a> `
          }${comment.content.replace(/\n/g, "<br/>")}</p>`,
        }}
      ></div>
      <button
        onClick={() => replyBtnHandler()}
        className="px-6"
      >
        回复
      </button>
    </div>
  );
};

export default Comments;
