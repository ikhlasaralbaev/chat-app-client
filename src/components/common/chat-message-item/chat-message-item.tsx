import { BsReply } from 'react-icons/bs'
// ChatMessage.tsx
import {
	Avatar,
	Box,
	Flex,
	HStack,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import moment from 'moment'
import React, { useState } from 'react'
import { IMessage } from 'services/rooms/rooms.types'
import { onContextMenuMessage } from 'store/slices/rooms/rooms.slice'
import ContextMenu from '../message-context-menu/message-context-menu'
interface ChatMessageProps extends IMessage {
	onEditMessage?: (id: string) => void
	onDeleteMessage?: (id: string) => void
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	onEditMessage,
	onDeleteMessage,
	...msg
}) => {
	const { created_at, message, created_by, _id, replied_message, replies } = msg
	const { user } = useAppSelector(state => state.auth)
	const { messageIsOpenContextMenu } = useAppSelector(state => state.rooms)
	const isMyMessage = user?.id == created_by?.id
	const edited = false
	const dispatch = useAppDispatch()

	const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 })

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault()
		setContextMenu({
			isOpen: true,
			x: event.pageX,
			y: event.pageY,
		})
		dispatch(onContextMenuMessage(_id))
	}

	const handleCloseMenu = () => {
		setContextMenu({ ...contextMenu, isOpen: false })
		dispatch(onContextMenuMessage(null))
	}

	return (
		<>
			<VStack
				filter={
					messageIsOpenContextMenu && messageIsOpenContextMenu !== _id
						? 'blur(10px)'
						: ''
				}
				align={isMyMessage ? 'end' : 'start'}
				spacing={2}
				p={4}
				bg={
					isMyMessage
						? useColorModeValue('blue.50', 'blue.800')
						: useColorModeValue('gray.50', 'gray.700')
				}
				borderRadius='md'
				shadow='sm'
				maxW='80%'
				alignSelf={isMyMessage ? 'flex-end' : 'flex-start'}
				onContextMenu={handleContextMenu}
				pos={'relative'}
			>
				{replied_message && (
					<Box
						p={2}
						bg={useColorModeValue('gray.100', 'gray.600')}
						borderLeft='4px'
						borderColor={useColorModeValue('gray.300', 'gray.500')}
						borderRadius='md'
						w='full'
					>
						<Text fontSize='sm' fontWeight='bold'>
							{replied_message?.created_by?.name || 'Deleted account'}
						</Text>
						<Text fontSize='sm'>{replied_message.message}</Text>
					</Box>
				)}
				<HStack align='start' spacing={4}>
					{!isMyMessage && (
						<Avatar src={created_by?.avatar} name={created_by?.name} />
					)}
					<VStack align='start' spacing={1}>
						<HStack position={'relative'}>
							{
								<Text fontWeight='bold'>
									{created_by?.name || 'Deleted account'}
								</Text>
							}
							<Text fontSize='sm' color='gray.500'>
								{moment(created_at).format('HH:mm:ss')}
							</Text>
							{edited && (
								<Text fontSize='xs' color='gray.400'>
									(edited)
								</Text>
							)}
						</HStack>
						<Text>{message}</Text>
					</VStack>
					{isMyMessage && (
						<Avatar src={created_by?.avatar} name={created_by?.name} />
					)}
				</HStack>

				{replies?.length ? (
					<>
						<Box mt={2} />
						<Flex
							alignItems={'center'}
							gap={2}
							fontSize={'xs'}
							textColor={'gray'}
							pos={'absolute'}
							bottom={2}
							right={2}
						>
							<BsReply fontSize={'16px'} />
							{replies?.length} replies
						</Flex>
					</>
				) : null}
			</VStack>
			<ContextMenu
				onEdit={() => onEditMessage?.(_id)}
				onDelete={() => onDeleteMessage?.(_id!)}
				isOpen={contextMenu.isOpen}
				onClose={handleCloseMenu}
				position={{ x: contextMenu.x, y: contextMenu.y }}
				isMyMessage={isMyMessage}
				msg={msg}
			/>
		</>
	)
}

export default ChatMessage
