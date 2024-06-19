import { BsReply } from 'react-icons/bs'
// ChatMessage.tsx
import {
	Avatar,
	Box,
	Flex,
	HStack,
	Spinner,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { imageWithBaseUrl } from 'lib/image/image.helper'
import moment from 'moment'
import React, { useState } from 'react'
import { IMessage } from 'services/rooms/rooms.types'
import { onContextMenuMessage } from 'store/slices/rooms/rooms.slice'
import ContextMenu from '../message-context-menu/message-context-menu'
import MessageFileSection from './message-file-section/message-file-section'
interface ChatMessageProps extends IMessage {
	onEditMessage?: (id: string) => void
	onDeleteMessage?: (id: string) => void
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	onEditMessage,
	onDeleteMessage,
	...msg
}) => {
	const {
		created_at,
		message,
		created_by,
		_id,
		replied_message,
		replies,
		file,
		is_updated,
	} = msg
	const { user } = useAppSelector(state => state.auth)
	const { messageIsOpenContextMenu, isDeletingMessage, deleteMessageId } =
		useAppSelector(state => state.rooms)
	const isMyMessage = user?.id == created_by?.id
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
				align={'start'}
				spacing={2}
				p={3}
				bg={
					isMyMessage
						? useColorModeValue('blue.50', 'blue.800')
						: useColorModeValue('gray.50', 'gray.700')
				}
				borderRadius='lg'
				shadow='sm'
				maxW='60%'
				alignSelf={isMyMessage ? 'flex-end' : 'flex-start'}
				onContextMenu={handleContextMenu}
				pos={'relative'}
			>
				{isDeletingMessage && deleteMessageId === _id ? (
					<Spinner
						pos={'absolute'}
						size={'sm'}
						style={isMyMessage ? { left: '-30px' } : { right: '-30px' }}
					/>
				) : null}
				{file && (
					<Flex w={'full'}>
						{' '}
						<MessageFileSection file={file} />
					</Flex>
				)}
				{replied_message && (
					<Box
						p={2}
						bg={useColorModeValue('gray.100', 'gray.600')}
						borderLeft='4px'
						borderColor={useColorModeValue('gray.300', 'gray.500')}
						borderRadius='md'
						w='full'
						mb={2}
					>
						<Text fontSize='sm' fontWeight='bold'>
							{replied_message?.created_by?.name || 'Deleted account'}
						</Text>
						<Text fontSize='sm'>{replied_message.message}</Text>
					</Box>
				)}
				<HStack align='start' spacing={4} w={'full'}>
					{!isMyMessage && (
						<Avatar
							src={imageWithBaseUrl(created_by?.avatar)}
							name={created_by?.name}
						/>
					)}
					<VStack align='start' spacing={1} w={'full'}>
						<HStack position={'relative'}>
							{
								<Text fontWeight='bold'>
									{created_by?.name || 'Deleted account'}
								</Text>
							}
							<Text fontSize='sm' color='gray.500'>
								{moment(created_at).format('HH:mm:ss')}
							</Text>
							{is_updated && (
								<Text fontSize='xs' color='gray.400'>
									(edited)
								</Text>
							)}
						</HStack>

						<Text>{message}</Text>
					</VStack>
					{isMyMessage && (
						<Avatar
							src={imageWithBaseUrl(created_by?.avatar)}
							name={created_by?.name}
						/>
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
