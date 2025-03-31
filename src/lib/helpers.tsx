import { addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { animateScroll as scroll } from "react-scroll";
import { Node } from "slate";
import { v4 as uuidv4 } from "uuid";

export const waitForOneSeconds = () => new Promise((resolve) => setTimeout(resolve, 1000));
export const waitForThreeSeconds = () => new Promise((resolve) => setTimeout(resolve, 3000));

export function formatDate(dateString: any) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const suffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // covers 4-20
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${suffix(day)} ${month} ${year}`;
}

export function formatDateShort(dateString: any) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const suffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // covers 4-20
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${suffix(day)} ${month} ${year}`;
}

export const formatDatetoTime = (data: any) => {
  const date = new Date(data);
  const africanTimeOptions: any = {
    timeZone: "Africa/Lagos", // Nigeria is in the Africa/Lagos timezone (WAT)
    hour12: true, // 12-hour format
    hour: "numeric", // Use 'numeric' to show the hour in 12-hour format
    minute: "numeric", // Use 'numeric' to show the minute
  };

  // Format time in the specified timezone
  const timeInAfrica = new Intl.DateTimeFormat("en-GB", africanTimeOptions).format(date);

  const dayOfWeek = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
  return `${dayOfWeek} ${timeInAfrica}`;
};

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const shortenText = (text: string, maxLength: number) => {
  if (!text) return;
  if (text.length > maxLength) return `${text.substring(0, maxLength)}...`;
  return text;
};

export const scrollToTop = () => scroll.scrollToTop();

export const scrollToBottom = () => scroll.scrollToBottom();
