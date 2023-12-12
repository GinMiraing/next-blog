import type { Metadata } from "next";

// import dynamic from "next/dynamic";
// import { getCommentsByPath } from "@/lib/backend";
import { BasicSettings } from "@/lib/setting";

// import { FormatedComment } from "@/components/Comments/type";
import FriendsLink from "@/components/FriendsLink";

// const Comments = dynamic(() => import("@/components/Comments"));

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${BasicSettings.name} - 友情链接`,
  description: `${BasicSettings.description}`,
};

export default async function Page() {
  // const comments = await getCommentsByPath("/link");

  // const data: FormatedComment[] = comments.map((comment) => ({
  //   id: comment._id,
  //   nick: comment.nick,
  //   emailMd5: comment.email_md5,
  //   link: comment.link,
  //   content: comment.content,
  //   isAdmin: comment.is_admin,
  //   isHidden: comment.is_hidden,
  //   reply: comment.reply,
  // }));

  return (
    <div className="min-h-[calc(100vh-10rem)] animate-fade space-y-6 py-6">
      <FriendsLink />
      {/* <Comments data={data} /> */}
    </div>
  );
}
