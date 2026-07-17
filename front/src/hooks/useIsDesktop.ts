import { useEffect, useState } from "react"

const DESKTOP_QUERY = "(min-width: 1024px)"

export default function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(
		() => window.matchMedia(DESKTOP_QUERY).matches,
	)

	useEffect(() => {
		const mediaQuery = window.matchMedia(DESKTOP_QUERY)
		const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)

		mediaQuery.addEventListener("change", onChange)
		return () => mediaQuery.removeEventListener("change", onChange)
	}, [])

	return isDesktop
}
