import { useMediaQuery } from '@chakra-ui/react'
import { useAppSelector } from './store.hooks'

const useSidebarCollapse = () => {
	const { sidebarIsOpen } = useAppSelector(state => state.ui)
	const isSmallScreen = useMediaQuery('(max-width: 767px)')

	return {
		left: isSmallScreen ? (sidebarIsOpen ? '0' : '-320px') : '0',
	}
}

export default useSidebarCollapse
