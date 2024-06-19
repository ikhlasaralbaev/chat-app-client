import { Flex, IconButton } from '@chakra-ui/react'
import { RiWechatLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import RecommendedChatsAvatars from '../recommended-chats-avatars/recommended-chats-avatars'

const SidebarHeader = () => {
	return (
		<Flex h={'70px'} alignItems={'center'} justifyContent={'space-between'}>
			<RecommendedChatsAvatars />

			<IconButton
				as={Link}
				to={`/create-room`}
				variant={'ghost'}
				aria-label='add-chat-room'
			>
				<RiWechatLine size={'24px'} />
			</IconButton>
		</Flex>
	)
}

export default SidebarHeader
