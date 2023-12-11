export type ReplyPreviewType = {
  nick: string;
  content: string;
  parentId: number;
  replyId: number;
};

export type CommentItemType = {
  id: number;
  nick: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  reply?: number;
  replyId?: number;
  replyNick?: string;
};
