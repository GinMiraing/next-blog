export type CommentType = {
  id: number;
  nick: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  timestamp: number;
  replyCount: number;
  replyList: {
    id: number;
    nick: string;
    emailMd5: string;
    link: string;
    content: string;
    isAdmin: boolean;
    timestamp: number;
    replyId: number;
    replyNick: string;
  }[];
};

export type CommentItemType = {
  id: number;
  nick: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  timestamp: number;
  reply?: number;
  replyId?: number;
  replyNick?: string;
};
