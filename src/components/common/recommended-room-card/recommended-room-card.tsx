import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RoomsService } from 'services/rooms/rooms.service'
import { subscribedRooms } from 'store/actions/rooms.action'

interface RoomCardProps {
	roomName: string
	description: string
	avatarUrl: string
	id: string
}

const RoomCard: React.FC<RoomCardProps> = ({
	roomName,
	description,
	avatarUrl,
	id,
}) => {
	const { subscribedRooms: subscribedRoomsList } = useAppSelector(
		state => state.rooms
	)
	const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const isAlreadyExist = subscribedRoomsList.find(
		item => item.chat_room._id === id
	)

	const joinToRoom = () => {
		setIsJoiningRoom(true)
		RoomsService.joinRoom(id).then(res => {
			setIsJoiningRoom(false)
			dispatch(subscribedRooms())
		})
	}

	return (
		<Box
			p={4}
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			boxShadow='md'
			_hover={{ boxShadow: 'lg' }}
			transition='box-shadow 0.2s ease-in-out'
			display='flex'
			flexDirection='column'
		>
			<VStack align='start' spacing={3} flex='1'>
				<HStack>
					<Avatar src={avatarUrl} name={roomName} />
					<Heading size='md'>{roomName}</Heading>
				</HStack>
				<Text>{description}</Text>
				<Spacer />
				<Flex w='100%' justifyContent='space-between'>
					<AvatarGroup size='sm' max={4}>
						<Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
						<Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
						<Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
						<Avatar
							name='Prosper Otemuyiwa'
							src='https://bit.ly/prosper-baba'
						/>
						<Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
					</AvatarGroup>
					{!isAlreadyExist ? (
						<Button
							isLoading={isJoiningRoom}
							colorScheme='blue'
							onClick={joinToRoom}
						>
							Join Room
						</Button>
					) : (
						<Button
							isLoading={isJoiningRoom}
							colorScheme='blue'
							as={Link}
							to={`/chat/${id}`}
							variant={'outline'}
						>
							View room
						</Button>
					)}
				</Flex>
			</VStack>
		</Box>
	)
}

export default RoomCard
