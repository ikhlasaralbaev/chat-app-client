import { useEffect, useState } from 'react'

const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(
		window.matchMedia(query).matches
	)

	useEffect(() => {
		const mediaQuery = window.matchMedia(query)
		const handleChange = (event: MediaQueryListEvent) =>
			setMatches(event.matches)

		// Initial check
		setMatches(mediaQuery.matches)

		// Add listener
		mediaQuery.addEventListener('change', handleChange)

		// Clean up the event listener on component unmount
		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	}, [query])

	return matches
}

export default useMediaQuery
