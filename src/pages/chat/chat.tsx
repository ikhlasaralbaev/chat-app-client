import {
	Box,
	Flex,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react'
import ChatMessage from 'components/common/chat-message-item/chat-message-item'
import MessageSkeleton from 'components/common/chat-message-skeleton/chat-message-skeleton'
import SendMessageForm from 'components/common/send-message-section/send-message-section'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { pusherClient } from 'lib/pusher/pusher.client'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FileService } from 'services/file/file.service'
import {
	roomMessages,
	sendMessageAction,
	updateMessageAction,
} from 'store/actions/rooms.action'
import {
	addIncomingMessage,
	deleteMessage,
	onUpdateMessage,
	selectedRoom,
	setReplyToMessage,
	setUpdatingMessage,
} from 'store/slices/rooms/rooms.slice'

const Chat = () => {
	const {
		subscribedRooms,
		isLoadingMessages,
		newMessages,
		replyToMessage,
		updatingMessage,
	} = useAppSelector(state => state.rooms)
	const params = useParams()
	const dispatch = useAppDispatch()
	const messagesEndRef = useRef<null | HTMLDivElement>(null)

	// scroll view on message
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView()
	}

	// send message handler
	const sendMessage = async (message: string, files: File[]) => {
		if (updatingMessage) {
			if (files.length) {
				FileService.uploadFile(files[0]).then(res => {
					dispatch(
						updateMessageAction({
							message,
							message_id: updatingMessage?._id,
							file_id: res.id,
						})
					)
				})
			} else {
				dispatch(
					updateMessageAction({
						message,
						message_id: updatingMessage?._id,
					})
				)
			}
		} else {
			if (files.length) {
				FileService.uploadFile(files[0]).then(res => {
					dispatch(
						sendMessageAction({
							room: params.roomId!,
							message,
							replied_message_id: replyToMessage?._id,
							file: res,
						})
					)
				})
			} else {
				dispatch(
					sendMessageAction({
						room: params.roomId!,
						message,
						replied_message_id: replyToMessage?._id,
					})
				)
			}
		}
		dispatch(setUpdatingMessage(null))
		dispatch(setReplyToMessage(null))
	}

	// get room messages, and set current room
	useEffect(() => {
		dispatch(roomMessages({ roomId: String(params.roomId)! }))
		dispatch(
			selectedRoom(
				subscribedRooms.find(item => item.chat_room._id === params.roomId)
					?.chat_room
			)
		)
	}, [params, subscribedRooms])

	// scroll chat to last message
	useEffect(() => {
		scrollToBottom()
	}, [newMessages, isLoadingMessages, replyToMessage])

	// listen current room messages
	const listeningMessages = () => {
		pusherClient.subscribe('room.' + params.roomId)

		pusherClient.bind('message', function (data: any) {
			dispatch(addIncomingMessage(data?.message))
		})

		pusherClient.bind('delete_message', function (data: any) {
			dispatch(
				deleteMessage({
					message: data?.message?._id,
					room: data?.chat_room_id,
				})
			)
		})

		pusherClient.bind('update_message', function (data: any) {
			dispatch(
				onUpdateMessage({
					message: data?.message?.message,
					message_id: data?.message?._id,
					room: data?.chat_room_id,
				})
			)
		})

		return () => {
			pusherClient.unsubscribe('room.' + params.roomId)
		}
	}

	useEffect(() => {
		listeningMessages()
	}, [params.roomId])

	return (
		<Stack h={'calc(100vh - 70px)'} w={'full'}>
			{newMessages.find(item => item.room === params.roomId!)?.message
				.length === 0 ? (
				<Flex
					alignItems={'center'}
					justifyContent={'center'}
					bg={useColorModeValue('gray.100', 'gray.700')}
					h={'screen'}
				>
					<Text>No messages yet.</Text>
				</Flex>
			) : (
				<VStack spacing={4} p={4}>
					{isLoadingMessages
						? Array.from({ length: 10 }).map((_, index) => (
								<MessageSkeleton
									isOwnMessage={index === 3 || index === 7 ? true : false}
								/>
						  ))
						: newMessages
								.find(item => item.room === params.roomId!)
								?.message?.map(item => (
									<ChatMessage key={item._id} {...item} />
								))}
					<Box
						mt={replyToMessage || updatingMessage ? '100px' : '50px'}
						ref={messagesEndRef}
					/>
				</VStack>
			)}

			<SendMessageForm onSubmit={sendMessage} />
		</Stack>
	)
}

export default Chat
