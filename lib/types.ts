export type ReplyCommentType = {
  id: number;
  nick: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  replyId: number;
  replyNick: string;
};

export type MainCommentType = {
  id: number;
  nick: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  reply: number;
};
