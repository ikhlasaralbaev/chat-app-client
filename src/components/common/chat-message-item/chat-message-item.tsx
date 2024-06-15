// ChatMessage.tsx
import {
	Avatar,
	Box,
	HStack,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

interface ChatMessageProps {
	avatarUrl: string
	username: string
	message: string
	time: string
	edited?: boolean
	isMyMessage?: boolean
	repliedMessage?: {
		username: string
		message: string
	}
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	avatarUrl,
	username,
	message,
	time,
	edited = false,
	isMyMessage = false,
	repliedMessage,
}) => {
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
						{repliedMessage.username}
					</Text>
					<Text fontSize='sm'>{repliedMessage.message}</Text>
				</Box>
			)}
			<HStack align='start' spacing={4}>
				{!isMyMessage && <Avatar src={avatarUrl} name={username} />}
				<VStack align='start' spacing={1}>
					<HStack>
						{!isMyMessage && <Text fontWeight='bold'>{username}</Text>}
						<Text fontSize='sm' color='gray.500'>
							{time}
						</Text>
						{edited && (
							<Text fontSize='xs' color='gray.400'>
								(edited)
							</Text>
						)}
					</HStack>
					<Text>{message}</Text>
				</VStack>
				{isMyMessage && <Avatar src={avatarUrl} name={username} />}
			</HStack>
		</VStack>
	)
}

export default ChatMessage
