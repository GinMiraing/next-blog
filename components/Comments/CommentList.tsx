import React from "react";

const CommentList: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export default CommentList;
