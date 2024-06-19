import { Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from 'hooks/store.hooks'
import { FC } from 'react'
import ChatListItem from '../chat-list-item/chat-list-item'

const ChatList: FC = () => {
	const {
		subscribedRooms: subscribedRoomsData,
		isLoading,
		searchedRooms,
	} = useAppSelector(state => state.rooms)

	return (
		<Stack
			spacing={2}
			mt={4}
			maxHeight={'calc(100vh - 160px)'}
			overflowY={'auto'}
		>
			{isLoading ? (
				<Text
					px={4}
					py={2}
					rounded={'md'}
					bg={useColorModeValue('gray.50', 'gray.900')}
					textAlign={'center'}
				>
					Connecting...
				</Text>
			) : (
				subscribedRoomsData.map((item, index) => {
					return <ChatListItem key={index} {...item} />
				})
			)}
		</Stack>
	)
}

export default ChatList
