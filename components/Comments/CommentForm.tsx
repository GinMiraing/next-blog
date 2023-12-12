"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

import { sleep } from "@/lib/utils";

import { CommentValue } from ".";

const CommentForm: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useFormContext<CommentValue>();

  const [loading, setLoading] = useState(false);

  const textareaInputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "0px";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 56}px`;
  };

  const onSubmit: SubmitHandler<CommentValue> = async (data) => {
    setLoading(true);

    await sleep(1000);

    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const OnError: SubmitErrorHandler<CommentValue> = async (errors) => {
    console.log(errors);

    for (const error of Object.values(errors)) {
      setError("root", { message: error.message }, { shouldFocus: false });
      break;
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit, OnError)}>
        <div className="w-full">
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
            {errors.root ? errors.root.message : ""}
          </div>
          <button
            disabled={loading}
            className="rounded bg-pink px-4 py-2 text-white transition-opacity hover:opacity-70 disabled:opacity-70"
            type="submit"
          >
            {loading ? <Loader2 className="animate-spin" /> : "提交"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
