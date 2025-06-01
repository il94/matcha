import { useRef, useEffect, useCallback } from "react"

export default function useDebouncedCallback<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (...args: any[]) => void,
>(callback: T, delay: number): (...args: Parameters<T>) => void {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const debouncedFn = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args)
			}, delay)
		},
		[callback, delay],
	)

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return debouncedFn
}
