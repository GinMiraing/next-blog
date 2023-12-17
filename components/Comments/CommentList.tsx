import React from "react";

import { cn } from "@/lib/utils";

const CommentList: React.FC<{
  children: React.ReactNode;
  divider?: boolean;
}> = ({ children, divider }) => {
  return (
    <div
      className={cn("space-y-4", {
        "divide-y divide-dashed divide-slate-300": divider,
      })}
    >
      {children}
    </div>
  );
};

export default CommentList;
