export type CommentType = {
  id: number;
  nick: string;
  email: string;
  emailMd5: string;
  link: string;
  content: string;
  isAdmin: boolean;
  isHidden: boolean;
  parentId: number;
  replyId: number;
  replyNick: string;
  formatTime: string;
  path: string;
};
