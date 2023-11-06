export type CommentSchema = {
  _id: number;
  nick: string;
  email_md5: string;
  link: string;
  content: string;
  is_admin: boolean;
  is_hidden: boolean;
  reply: number;
};

export type ReplySchema = {
  _id: number;
  nick: string;
  email_md5: string;
  link: string;
  content: string;
  is_admin: boolean;
  is_hidden: boolean;
  reply_id: number;
  reply_nick: string;
};

export type FormatedComment = {
  id: number;
  nick: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  reply: number;
};

export type FormatedReply = {
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
