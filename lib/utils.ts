import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString : Date) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const diffInMs = now.getTime() - date.getTime();
  
  // Handle future dates
  if (diffInMs < 0) {
    return 'Scheduled update';
  }

  // Calculate the difference in time units
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // More accurate month calculation
  let diffInMonths = 0;
  const monthDiff = now.getMonth() - date.getMonth();
  const yearDiff = now.getFullYear() - date.getFullYear();
  
  diffInMonths = yearDiff * 12 + monthDiff;
  
  // Adjust for day of month
  if (now.getDate() < date.getDate()) {
    diffInMonths--;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return `last updated ${rtf.format(-diffInSeconds, 'second')}`;
  } else if (diffInMinutes < 60) {
    return `last updated ${rtf.format(-diffInMinutes, 'minute')}`;
  } else if (diffInHours < 24) {
    return `last updated ${rtf.format(-diffInHours, 'hour')}`;
  } else if (diffInDays < 30) {
    return `last updated ${rtf.format(-diffInDays, 'day')}`;
  } else if (diffInMonths < 12) {
    return `last updated ${rtf.format(-diffInMonths, 'month')}`;
  } else {
    return `last updated ${rtf.format(-diffInYears, 'year')}`;
  }
}