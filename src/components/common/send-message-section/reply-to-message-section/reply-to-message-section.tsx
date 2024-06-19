import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { BsReplyAll } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { setReplyToMessage } from 'store/slices/rooms/rooms.slice'

const ReplyToMessageSection = () => {
	const { replyToMessage } = useAppSelector(state => state.rooms)
	const dispatch = useAppDispatch()

	const handleRemoveReplyMessage = () => {
		dispatch(setReplyToMessage(null))
	}

	return (
		<Flex mb={2}>
			<Box
				w={'40px'}
				h={'40px'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				borderRight={'2px'}
				borderRightColor={'blue.500'}
				color='blue.500'
			>
				<BsReplyAll size={'24px'} />
			</Box>

			<Flex
				px={4}
				alignItems={'center'}
				justifyContent={'space-between'}
				w={'full'}
			>
				<Stack spacing={0}>
					<Text color={'blue.500'}>Reply to message:</Text>
					<Text fontSize={'sm'}>{replyToMessage?.message}</Text>
				</Stack>

				<IconButton
					onClick={handleRemoveReplyMessage}
					fontSize={'24px'}
					color={'gray'}
					aria-label='cancel reply message'
				>
					<AiOutlineCloseCircle />
				</IconButton>
			</Flex>
		</Flex>
	)
}

export default ReplyToMessageSection
