import { Box } from '@chakra-ui/react'
import ChatList from 'components/common/chat-list/chat-list'
import SearchChat from 'components/common/search-chat/search-chat'
import SidebarHeader from 'components/common/sidebar-header/sidebar-header'
import SidebarRecommendedChats from 'components/common/sidebar-recommended-chats/sidebar-recommended-chats'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import useClickOutside from 'hooks/use-click-outside'
import useSidebarCollapse from 'hooks/use-sidebar-collapse'
import { FC, useEffect } from 'react'
import { subscribedRooms } from 'store/actions/rooms.action'
import { toggleSidebar } from 'store/slices/ui/ui.slice'

const Sidebar: FC = () => {
	const { subscribedRooms: subscribedRoomsData } = useAppSelector(
		state => state.rooms
	)
	const dispatch = useAppDispatch()
	const sidebarToggleStyles = useSidebarCollapse()

	// close sidebar on click outside
	const closeSidebar = () => dispatch(toggleSidebar(false))
	const sidebarRef = useClickOutside(closeSidebar)

	useEffect(() => {
		dispatch(subscribedRooms())
	}, [])

	return (
		<Box
			ref={sidebarRef}
			maxH={{
				base: '100vh',
				md: '100vh - 70px',
			}}
			pos={{
				base: 'fixed',
				md: 'sticky',
			}}
			top='70px'
			bottom={0}
			bg='rgba(0, 0, 0, 0.05)'
			backdropFilter='blur(20px)'
			borderRight={'1px solid rgba(0,0,0,.05)'}
			width={'320px'}
			px={4}
			overflowY={'auto'}
			sx={sidebarToggleStyles}
			transition={'left .3s linear'}
			zIndex={'60'}
		>
			<SidebarHeader />
			<SearchChat />
			{subscribedRoomsData.length === 0 ? (
				<SidebarRecommendedChats />
			) : (
				<ChatList />
			)}
		</Box>
	)
}

export default Sidebar
