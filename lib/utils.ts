import { clsx, type ClassValue } from "clsx"
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type MarkerType = {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

export function formatTimestamp(timestamp: any): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}