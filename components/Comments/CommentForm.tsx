"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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

type ReplyPreview = {
  replyNick: string;
  content: string;
  parentId: number;
  replyId: number;
} | null;

const CommentForm: React.FC<{
  replyPreview: ReplyPreview;
  setReplyPreview: React.Dispatch<React.SetStateAction<ReplyPreview>>;
}> = ({ replyPreview, setReplyPreview }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<CommentValue>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      nick: "",
      email: "",
      link: "",
      content: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentValue> = async (data) => {
    setLoading(true);
    const { nick, email, link, content } = data;

    try {
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return <div></div>;
};

export default CommentForm;
