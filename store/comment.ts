import { atom } from "nanostores";

export const ReplyData = atom({
  isReply: false,
  nick: "",
  parentId: 0,
  replyId: 0,
  content: "",
});

export const Refresh = atom(false);
