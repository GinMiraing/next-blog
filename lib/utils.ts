import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toggleTheme = () => {
  const rootElement = document.querySelector("html");
  if (rootElement) {
    rootElement.classList.contains("dark")
      ? rootElement.classList.remove("dark")
      : rootElement.classList.add("dark");
  }
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
