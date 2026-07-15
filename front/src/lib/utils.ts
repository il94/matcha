import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatRetryAfter(seconds: number) {
	const min = Math.floor(seconds / 60)
	const sec = seconds % 60

	if (min <= 0) return `${sec}s`
	return `${min}min ${sec}s`
}
