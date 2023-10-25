"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const commentSchema = z.object({
  username: z.string().min(1, { message: "昵称不能为空" }),
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

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentValue> = async (data) => {
    setLoading(true);
    const { username, email, link, content } = data;
    const replyTo = "";

    try {
      const res = await axios({
        method: "POST",
        url: "/api/comment",
        data: {
          username,
          email,
          link,
          content,
          is_admin: false,
          is_hidden: false,
          reply_to: replyTo,
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
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="flex h-full shrink-0 items-center bg-gray-100 px-4">
              <label>昵称</label>
            </div>
            <input
              className="grow rounded-sm border px-2 py-1 outline-none"
              type="text"
              {...register("username", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("username", e.currentTarget.value);
                },
              })}
            />
          </div>
          <div className="flex">
            <div className="flex h-full shrink-0 items-center bg-gray-100 px-4">
              <label>邮箱</label>
            </div>
            <input
              className="grow rounded-sm border px-2 py-1 outline-none placeholder:text-sm"
              placeholder="用于邮件通知"
              type="text"
              {...register("email", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("email", e.currentTarget.value);
                },
              })}
            />
          </div>
          <div className="flex">
            <div className="flex h-full shrink-0 items-center bg-gray-100 px-4">
              <label>网站</label>
            </div>
            <input
              className="grow rounded-sm border px-2 py-1 outline-none placeholder:text-sm"
              type="text"
              {...register("link")}
            />
          </div>
        </div>

        <div className="w-full">
          <div
            id="content"
            className="mt-4 min-h-[6rem] w-full whitespace-pre rounded-sm border p-2 outline-none"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              setValue("content", e.currentTarget.innerHTML);
            }}
            {...register("content")}
          >
            <p>
              <br />
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-between">
          <div className="text-sm text-red-500">
            {errors.username
              ? errors.username.message
              : errors.email
              ? errors.email.message
              : errors.content
              ? errors.content.message
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
  const [commentList, setCommentList] = useState<
    { content: string; _id: string }[]
  >([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/comment",
        });
        console.log(res.data.comments);

        setCommentList(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);
  return (
    <div>
      {commentList.map((comment) => (
        <div key={comment._id}>{comment.content}</div>
      ))}
    </div>
  );
};

export default Comments;
