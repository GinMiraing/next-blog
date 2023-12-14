export type CommentRaw = {
  _id: number;
  nick: string;
  link: string;
  content: string;
  email_md5: string;
  is_admin: boolean;
  is_hidden: boolean;
  reply: string;
};
