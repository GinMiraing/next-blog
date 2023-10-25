"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { CommentType } from "@/lib/types";

const commentSchema = z.object({
  nick: z.string().min(1, { message: "昵称不能为空" }),
  email: z.string().email({ message: "邮箱格式不正确" }).min(1),
  link: z.string().optional(),
  content: z.string().min(1, { message: "评论内容不能为空" }).max(200),
});

type CommentValue = z.infer<typeof commentSchema>;

const Comments = () => {
  return (
    <div>
      <CommentsInputForm />
      <CommentsList />
    </div>
  );
};

const CommentsInputForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CommentValue>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentValue> = async (data) => {
    setLoading(true);
    const { nick, email, link, content } = data;

    try {
      const res = await axios({
        method: "POST",
        url: "/api/comment",
        data: {
          nick,
          email,
          link,
          content,
          parentId: 0,
          replyId: 0,
          replyNick: "",
          path: pathname,
        },
      });
      console.log(res.data);
      reset();
      const contentDOM = document.getElementById("content");
      if (contentDOM) {
        contentDOM.innerHTML = `<p><br /></p>`;
      }
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
          <div
            id="content"
            className="mt-4 min-h-[6rem] w-full whitespace-pre rounded-sm border p-2 outline-none"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              if (e.currentTarget.innerHTML === "") {
                e.currentTarget.innerHTML = "<p><br/></p>";
                setValue("content", "");
              } else {
                setValue("content", e.currentTarget.innerHTML);
              }
            }}
            {...register("content")}
          >
            <p>
              <br />
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-between">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center">
              <div className="flex h-full shrink-0 items-center bg-gray-100 px-4">
                <label>昵称</label>
              </div>
              <input
                className="w-10 grow rounded-sm border px-2 py-1 outline-none"
                type="text"
                {...register("nick")}
              />
            </div>
            <div className="flex">
              <div className="flex h-full shrink-0 items-center bg-gray-100 px-4">
                <label>邮箱</label>
              </div>
              <input
                className="w-10 grow rounded-sm border px-2 py-1 outline-none placeholder:text-sm"
                placeholder="用于邮件通知"
                type="text"
                {...register("email")}
              />
            </div>
            <div className="flex">
              <div className="flex h-full shrink-0 items-center bg-gray-100 px-4">
                <label>网站</label>
              </div>
              <input
                className="w-10 grow rounded-sm border px-2 py-1 outline-none placeholder:text-sm"
                type="text"
                {...register("link")}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="rounded bg-pink px-4 py-2 text-white hover:opacity-70"
            type="submit"
          >
            {loading ? <Loader2 className="animate-spin" /> : "提交"}
          </button>
        </div>
        <div className="text-sm text-red-500">
          {errors.nick
            ? errors.nick.message
            : errors.email
            ? errors.email.message
            : errors.content
            ? errors.content.message
            : ""}
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
    <div>
      {commentList.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
};

export default Comments;
