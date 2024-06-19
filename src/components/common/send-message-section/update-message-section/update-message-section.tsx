import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'

import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { setUpdatingMessage } from 'store/slices/rooms/rooms.slice'

const UpdateMessageSection = () => {
	const { updatingMessage } = useAppSelector(state => state.rooms)
	const dispatch = useAppDispatch()

	const handleRemoveUpdatingMessage = () => {
		dispatch(setUpdatingMessage(null))
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
				<FiEdit2 size={'24px'} />
			</Box>

			<Flex
				px={4}
				alignItems={'center'}
				justifyContent={'space-between'}
				w={'full'}
			>
				<Stack spacing={0}>
					<Text color={'blue.500'}>Edit message:</Text>
					<Text fontSize={'sm'}>{updatingMessage?.message}</Text>
				</Stack>

				<IconButton
					onClick={handleRemoveUpdatingMessage}
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

export default UpdateMessageSection
