import CLASS_DAYS from "@/constants/ClassDays.constant";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getDayName(day: number) {
  const dayObj = CLASS_DAYS.find((item) => item.value === day.toString());
  return dayObj?.name;
}


export function getTimeString(time: Date) {
 const result = dayjs(time).format("HH:mm");
 return result
}
