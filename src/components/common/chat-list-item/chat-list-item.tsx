import {
	Avatar,
	AvatarBadge,
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toggleSidebar } from 'store/slices/ui/ui.slice'

interface Props {
	chat_room_id: string | number
}

const ChatListItem: FC<Props> = ({ chat_room_id }) => {
	const params = useParams()
	const dispatch = useDispatch()
	const isActive: boolean = params.chatId != chat_room_id
	const closeSidebarOnChooseRoom = () => dispatch(toggleSidebar(false))

	return (
		<Flex
			onClick={closeSidebarOnChooseRoom}
			as={Link}
			to={`/chat/${chat_room_id}`}
			bg={!isActive ? useColorModeValue('blue.300', 'blue.500') : ''}
			p={'6px 12px'}
			rounded={'md'}
			alignItems={'center'}
			gap={4}
			_hover={{
				bg: isActive ? useColorModeValue('gray.200', 'gray.800') : '',
			}}
		>
			<Avatar size={'sm'} src={'https://picsum.photos/100'}>
				<AvatarBadge boxSize='1.25em' bg='green.500' />
			</Avatar>

			<Stack spacing={0}>
				<Text fontWeight={'semibold'}>Andrey Holand</Text>
				<Text fontSize={'sm'}>You: Hello world! My friend...</Text>
			</Stack>
		</Flex>
	)
}

export default ChatListItem
