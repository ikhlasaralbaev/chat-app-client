import { Stack, Text } from '@chakra-ui/react'
import RecommendedChatsAvatars from '../recommended-chats-avatars/recommended-chats-avatars'

const SidebarRecommendedChats = () => {
	return (
		<Stack justifyContent={'center'} pt={6} alignItems={'center'} gap={2}>
			<Text>Select or create room for messaging...</Text>
			<RecommendedChatsAvatars />
		</Stack>
	)
}

export default SidebarRecommendedChats
