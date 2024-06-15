import { Stack } from '@chakra-ui/react'
import { FC } from 'react'
import ChatListItem from '../chat-list-item/chat-list-item'

const ChatList: FC = () => {
	return (
		<Stack
			spacing={2}
			mt={4}
			maxHeight={'calc(100vh - 160px)'}
			overflowY={'auto'}
		>
			{Array.from({ length: 10 }).map((item, index) => {
				return <ChatListItem key={index} chat_room_id={index} />
			})}
		</Stack>
	)
}

export default ChatList
