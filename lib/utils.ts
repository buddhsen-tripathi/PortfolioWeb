import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function parseDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString();
  const [dd, mm, yyyy] = dateStr.split("-").map(Number);
  const formattedDate = new Date(`${yyyy}-${mm}-${dd}`);
  return isNaN(formattedDate.getTime()) ? new Date().toISOString() : formattedDate.toISOString();
}