import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getLocale(): string {
  const locale = document.documentElement.lang;
  return (locale as string) || "ar";
}
