export type ReplyCommentType = {
  id: number;
  nick: string;
  email: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  formatTime: string;
  path: string;
  parentId: number;
  replyId: number;
  replyNick: string;
};

export type MainCommentType = {
  id: number;
  nick: string;
  email: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  formatTime: string;
  path: string;
  reply: number;
};
