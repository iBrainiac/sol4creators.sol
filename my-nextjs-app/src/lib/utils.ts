import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function clipAddress(address: string): string {
	return (
		address.substring(0, 4) +
		"..." +
		address.substring(address.length - 4, address.length)
	);
}
