import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** A `tel:` href from a US display number (strips formatting, adds +1). */
export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "")}`
