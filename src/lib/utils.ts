import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string | undefined): string {
  if (!address || typeof address === "undefined") {
    return "error";
  }

  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function localTime(dateTime: string, timeZone: string): string {
  try {
    const date = new Date(dateTime);

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timeZone,
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    return "no date set";
  }
}
