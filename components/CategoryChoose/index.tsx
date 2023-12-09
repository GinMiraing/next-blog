"use client";

import { useRouter } from "next/navigation";

import { Categories } from "@/lib/setting";

import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../DropdownMenu";

const CategoryChoose: React.FC<{
  crurentCategory?: string;
}> = ({ crurentCategory }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium text-xl">
        当前分类：{crurentCategory ? crurentCategory : "全部"}
      </h1>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-32"
            variant="outline"
          >
            {crurentCategory ? crurentCategory : "选择分类"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Categories.map((item) => (
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  item.name === "全部"
                    ? "/category"
                    : `/category?category=${item.name}`,
                )
              }
              key={item.key}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryChoose;
