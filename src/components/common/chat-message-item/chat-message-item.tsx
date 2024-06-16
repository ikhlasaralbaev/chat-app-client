// ChatMessage.tsx
import {
	Avatar,
	Box,
	HStack,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react'
import { useAppSelector } from 'hooks/store.hooks'
import moment from 'moment'
import React from 'react'
import { IMessage } from 'services/rooms/rooms.types'
interface ChatMessageProps extends IMessage {}

const ChatMessage: React.FC<ChatMessageProps> = ({
	created_at,
	message,
	created_by,
}) => {
	const { user } = useAppSelector(state => state.auth)
	const isMyMessage = user?.id == created_by.id
	const repliedMessage = null
	const edited = false

	return (
		<VStack
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
		>
			{repliedMessage && (
				<Box
					p={2}
					bg={useColorModeValue('gray.100', 'gray.600')}
					borderLeft='4px'
					borderColor={useColorModeValue('gray.300', 'gray.500')}
					borderRadius='md'
					w='full'
				>
					<Text fontSize='sm' fontWeight='bold'>
						{''}
					</Text>
					<Text fontSize='sm'>{''}</Text>
				</Box>
			)}
			<HStack align='start' spacing={4}>
				{!isMyMessage && (
					<Avatar src={created_by.avatar} name={created_by.name} />
				)}
				<VStack align='start' spacing={1}>
					<HStack>
						{<Text fontWeight='bold'>{created_by.name}</Text>}
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
					<Avatar src={created_by.avatar} name={created_by.name} />
				)}
			</HStack>
		</VStack>
	)
}

export default ChatMessage
