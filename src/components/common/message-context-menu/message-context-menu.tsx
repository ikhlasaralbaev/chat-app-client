import { BsReply } from 'react-icons/bs'
// ContextMenu.tsx
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
	Box,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { useAppDispatch } from 'hooks/store.hooks'
import React, { CSSProperties, useRef } from 'react'
import { IMessage } from 'services/rooms/rooms.types'
import { deleteMessageAction } from 'store/actions/rooms.action'
import {
	setDeleteMessageId,
	setReplyToMessage,
	setUpdatingMessage,
} from 'store/slices/rooms/rooms.slice'

interface ContextMenuProps {
	onEdit: () => void
	onDelete: () => void
	isOpen: boolean
	onClose: () => void
	position: { x: number; y: number }
	isMyMessage: boolean
	msg?: IMessage
}

const ContextMenu: React.FC<ContextMenuProps> = ({
	onEdit,
	onDelete,
	isOpen,
	onClose,
	position,
	isMyMessage,
	msg,
}) => {
	const toast = useToast()
	const menuRef = useRef<HTMLButtonElement | null>(null)
	const dispatch = useAppDispatch()

	const handleEdit = () => {
		dispatch(setUpdatingMessage(msg!))
		onClose()
	}

	const handleReplyMessage = () => {
		dispatch(setReplyToMessage(msg!))
		onClose()
	}

	const handleDeleteMessage = () => {
		dispatch(deleteMessageAction({ message: msg?._id!, room: msg?.room._id! }))
		dispatch(setDeleteMessageId(msg?._id!))
	}

	const customStyles: CSSProperties = {
		position: 'absolute',
		top: `${position.y}px`,
		left: `${position.x}px`,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		backdropFilter: 'blur(8px)',
	}

	return (
		<Menu isOpen={isOpen} onClose={onClose}>
			<MenuButton as={Box} ref={menuRef} style={customStyles}>
				<IconButton
					aria-label='Options'
					icon={<span style={{ display: 'none' }}>Options</span>}
					variant='ghost'
					size='sm'
					style={{ display: 'none' }}
				/>
			</MenuButton>
			<MenuList
				backdropFilter={'blur(20px)'}
				bg={useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0,0,0,.1)')}
				px={2}
			>
				{isMyMessage ? (
					<>
						<MenuItem
							icon={<EditIcon />}
							onClick={handleEdit}
							bg={'transparent'}
							_hover={{
								bg: 'blue.500',
								color: 'white',
							}}
							rounded={'md'}
						>
							Edit
						</MenuItem>
						<MenuItem
							onClick={handleDeleteMessage}
							_hover={{
								bg: 'blue.500',
								color: 'white',
							}}
							rounded={'md'}
							icon={<DeleteIcon />}
							bg={'transparent'}
						>
							Delete
						</MenuItem>
					</>
				) : (
					<></>
				)}
				<MenuItem
					_hover={{
						bg: 'blue.500',
						color: 'white',
					}}
					rounded={'md'}
					icon={<BsReply size={'16px'} />}
					onClick={handleReplyMessage}
					bg={'transparent'}
					fontSize={'14px'}
				>
					Reply
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default ContextMenu
