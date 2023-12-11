import { ReplyPreviewType } from "./type";

const ReplyPreview: React.FC<{
  replyPreview: ReplyPreviewType;
  pathname: string;
}> = ({ replyPreview, pathname }) => {
  const { replyId, nick, content } = replyPreview;

  return (
    <>
      <div className="text-sm sm:text-base">
        你正在回复：{" "}
        <a
          className="transition-colors hover:text-pink"
          href={`${pathname}#${replyId}`}
        >
          {nick}
        </a>
      </div>
      <div className="comments-content mt-4 w-full rounded-md bg-red-50 px-2 py-4 sm:px-4">
        <p className="whitespace-pre-wrap text-justify text-sm/6 sm:text-base/7">
          {content}
        </p>
      </div>
    </>
  );
};

export default ReplyPreview;
