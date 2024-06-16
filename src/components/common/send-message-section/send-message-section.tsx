import {
	Box,
	Flex,
	IconButton,
	Input,
	InputGroup,
	useDisclosure,
} from '@chakra-ui/react'
import EmojiPicker from 'emoji-picker-react'
import { useAppSelector } from 'hooks/store.hooks'
import useClickOutside from 'hooks/use-click-outside'
import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'

interface SendMessageFormProps {
	onSubmit?: (message: string, files: File[]) => void
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSubmit }) => {
	const { isLoading } = useAppSelector(state => state.rooms)
	const [message, setMessage] = useState('')
	const [files, setFiles] = useState<File[]>([])
	const { isOpen, onToggle } = useDisclosure()
	const emojiRef = useClickOutside(() => onToggle())

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files)
			setFiles(selectedFiles)
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit?.(message, files)
		setMessage('')
		setFiles([])
	}

	const handleEmojiSelect = (emoji: any) => {
		setMessage(message + emoji.emoji)
	}

	return (
		<Box
			as='form'
			onSubmit={handleSubmit}
			p={4}
			position={'fixed'}
			bottom={'0'}
			left={{
				sm: '0',
				md: '320px',
			}}
			right={'0'}
			bg='rgba(0, 0, 0, 0.05)'
			backdropFilter='blur(20px)'
			zIndex='50'
			borderTop={'1px solid rgba(0,0,0,.05)'}
		>
			<Flex align='center' gap={2}>
				<IconButton
					aria-label='Attach files'
					size={'md'}
					icon={
						<span role='img' aria-label='attachment'>
							📎
						</span>
					}
					variant='ghost'
				/>
				<InputGroup>
					<Input
						placeholder='Type a message...'
						value={message}
						onChange={e => setMessage(e.target.value)}
						size='md'
						borderRadius='lg'
					/>
				</InputGroup>
				<IconButton
					onClick={onToggle}
					variant={'ghost'}
					size='sm'
					colorScheme='blue'
					type='button'
					aria-label='Send message'
					disabled={message.trim().length === 0}
				>
					<BsEmojiSmile size={'28px'} />
				</IconButton>
				<IconButton
					variant={'ghost'}
					size='sm'
					colorScheme='blue'
					type='submit'
					aria-label='Send message'
					isLoading={isLoading}
					disabled={message.trim().length === 0}
				>
					<BiSend size={'28px'} />
				</IconButton>
			</Flex>
			{isOpen && (
				<Box ref={emojiRef} pos={'fixed'} mt={2} bottom={6} right={4}>
					<EmojiPicker onEmojiClick={handleEmojiSelect} />
				</Box>
			)}
			<input
				type='file'
				multiple
				accept='image/*, video/*, audio/*'
				onChange={handleFileChange}
				style={{ display: 'none' }}
				id='file-upload'
			/>
		</Box>
	)
}

export default SendMessageForm
