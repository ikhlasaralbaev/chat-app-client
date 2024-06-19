import {
	Avatar,
	AvatarBadge,
	Badge,
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ISubscribedRoom } from 'services/rooms/rooms.types'
import { toggleSidebar } from 'store/slices/ui/ui.slice'

interface Props extends ISubscribedRoom {
	chat_room_id?: string | number
}

const ChatListItem: FC<Props> = ({ chat_room, avatar }) => {
	const params = useParams()
	const dispatch = useDispatch()
	const isActive: boolean = params.roomId == chat_room._id
	const closeSidebarOnChooseRoom = () => dispatch(toggleSidebar(false))
	const [incomingMsg, setIncomingMsg] = useState(0)

	return (
		<Flex
			onClick={closeSidebarOnChooseRoom}
			as={Link}
			to={`/chat/${chat_room?._id}`}
			bg={isActive ? useColorModeValue('blue.300', 'blue.500') : ''}
			p={'6px 12px'}
			rounded={'md'}
			alignItems={'center'}
			gap={4}
			_hover={{
				bg: !isActive ? useColorModeValue('gray.200', 'gray.800') : '',
			}}
		>
			<Avatar size={'sm'} src={avatar}>
				<AvatarBadge boxSize='1.25em' bg='green.500' />
			</Avatar>

			<Stack spacing={0}>
				<Text color={isActive ? 'white' : ''} fontWeight={'semibold'}>
					{chat_room.name}
				</Text>
				<Text color={isActive ? 'gray.100	' : ''} fontSize={'sm'}>
					You: Hello world! My friend...
				</Text>
				{incomingMsg ? <Badge color={'green'}>{incomingMsg}</Badge> : ''}
			</Stack>
		</Flex>
	)
}

export default ChatListItem
