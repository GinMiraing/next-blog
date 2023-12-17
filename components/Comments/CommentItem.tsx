import dayjs from "dayjs";

import { CommentItemType } from "@/lib/types";

const CommentItem: React.FC<{
  item: CommentItemType;
  pathname: string;
  children: React.ReactNode;
}> = ({ item, pathname, children }) => {
  const { id, link, nick, isAdmin, content, replyId, replyNick, timestamp } =
    item;

  return (
    <div
      className="-mt-20 w-full pt-20"
      id={id.toString()}
    >
      <div className="flex w-full">
        {children}
        <div className="ml-4 flex w-full flex-col space-y-3 overflow-hidden">
          <div className="no-scrollbar flex items-center space-x-2 overflow-scroll sm:space-x-3">
            {link ? (
              <a
                className="whitespace-nowrap text-lg transition-colors hover:text-pink"
                href={link}
                target="_blank"
              >
                {nick}
              </a>
            ) : (
              <div className="whitespace-nowrap text-lg">{nick}</div>
            )}
            <div className="whitespace-nowrap text-xs">
              <div>{dayjs(timestamp).format("YYYY-MM-DD HH:mm")}</div>
            </div>
            {isAdmin && (
              <div className="whitespace-nowrap rounded-md bg-blue-100 px-1.5 text-sm">
                博主
              </div>
            )}
          </div>
          <div className="comments-content relative w-full rounded-md bg-red-50 px-3 py-4 sm:px-4">
            <p className="whitespace-pre-wrap break-all text-justify text-sm/6 sm:text-base/7">
              {replyId && (
                <a
                  className="mr-2 bg-yellow-200 transition-colors hover:text-pink"
                  href={`${pathname}#${replyId}`}
                >
                  @{replyNick}
                </a>
              )}
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
