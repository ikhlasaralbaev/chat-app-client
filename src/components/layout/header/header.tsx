import { Avatar, Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import ProfileBtn from 'components/common/profile-btn/profile-btn'
import ToggleColorMode from 'components/common/toggle-color-mode/toggle-color-mode'
import { useAppSelector } from 'hooks/store.hooks'
import { FC } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toggleSidebar } from 'store/slices/ui/ui.slice'

const Header: FC = () => {
	const { selectedRoom } = useAppSelector(state => state.rooms)
	const dispatch = useDispatch()
	const params = useParams()

	// toggle sidebar
	const sidebarToggler = () => dispatch(toggleSidebar())

	return (
		<Box
			h='70px'
			w={'full'}
			pos={'sticky'}
			top='0'
			bg='rgba(0, 0, 0, 0.05)'
			backdropFilter='blur(50px)'
			zIndex='50'
			borderBottom={'1px solid rgba(0,0,0,.05)'}
		>
			<Flex
				w={{
					base: '95%',
				}}
				justifyContent={'space-between'}
				alignItems={'center'}
				mx={'auto'}
				h={'full'}
			>
				<Flex gap={2}>
					<IconButton
						onClick={sidebarToggler}
						display={{
							base: 'flex',
							md: 'none',
						}}
						colorScheme='blue'
						aria-label='toggle-sidebar'
					>
						<CgMenuLeft size={'20px'} />
					</IconButton>
					{params.roomId ? (
						<Flex alignItems={'center'} gap={4}>
							<Avatar src={selectedRoom?.avatar} />
							<Stack spacing={0}>
								<Text fontWeight={'semibold'}>{selectedRoom?.name}</Text>
								<Text color={'gray'} fontSize={'sm'}>
									14 members, 2 online.
								</Text>
							</Stack>
						</Flex>
					) : (
						<Flex alignItems={'center'} gap={4}>
							<Text fontSize={'28px'} fontWeight={'bold'}>
								RoomS
							</Text>
						</Flex>
					)}
				</Flex>

				<Flex alignItems={'center'} gap={2}>
					<ToggleColorMode />

					<ProfileBtn />
				</Flex>
			</Flex>
		</Box>
	)
}

export default Header
