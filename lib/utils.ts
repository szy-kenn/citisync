import { clsx, type ClassValue } from "clsx"
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