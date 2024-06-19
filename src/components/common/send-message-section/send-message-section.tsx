import {
	Box,
	Flex,
	IconButton,
	Input,
	InputGroup,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import EmojiPicker from 'emoji-picker-react'
import { useAppSelector } from 'hooks/store.hooks'
import useClickOutside from 'hooks/use-click-outside'
import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import FileMessageSection from './file-message-section/file-message-section'
import ReplyToMessageSection from './reply-to-message-section/reply-to-message-section'
import UpdateMessageSection from './update-message-section/update-message-section'

interface SendMessageFormProps {
	onSubmit?: (message: string, files: File[]) => void
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSubmit }) => {
	const {
		isSendingMessage: isLoading,
		replyToMessage,
		updatingMessage,
	} = useAppSelector(state => state.rooms)
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

	const handleClearFiles = () => {
		setFiles([])
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
			px={4}
			py={2}
			pb={4}
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
			{files.length ? (
				<FileMessageSection file={files[0]} onDelete={handleClearFiles} />
			) : null}
			{replyToMessage ? <ReplyToMessageSection /> : null}
			{updatingMessage ? <UpdateMessageSection /> : null}
			<Flex align='center' gap={2}>
				<label htmlFor='file-upload'>
					<Box
						cursor={'pointer'}
						w={'40px'}
						h={'40px'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						rounded={'md'}
						_hover={{
							bg: useColorModeValue('rgba(0,0,0,.1)', 'rgba(255,255,255,.2)'),
						}}
						transition={'all .2s linear'}
					>
						<span role='img' aria-label='attachment'>
							📎
						</span>
					</Box>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						style={{ visibility: 'hidden', position: 'absolute' }}
						id='file-upload'
						name='file-upload'
					/>
				</label>
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
					isDisabled={message.trim().length === 0}
				>
					<BiSend size={'28px'} />
				</IconButton>
			</Flex>
			{isOpen && (
				<Box ref={emojiRef} pos={'fixed'} mt={2} bottom={6} right={4}>
					<EmojiPicker onEmojiClick={handleEmojiSelect} />
				</Box>
			)}
		</Box>
	)
}

export default SendMessageForm
