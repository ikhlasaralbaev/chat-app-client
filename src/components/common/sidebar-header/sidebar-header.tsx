import { Avatar, AvatarGroup, Flex, IconButton } from '@chakra-ui/react'
import { RiWechatLine } from 'react-icons/ri'

const SidebarHeader = () => {
	return (
		<Flex h={'70px'} alignItems={'center'} justifyContent={'space-between'}>
			<AvatarGroup size='sm' max={4}>
				<Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
				<Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
				<Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
				<Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
				<Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
			</AvatarGroup>

			<IconButton variant={'ghost'} aria-label='add-chat-room'>
				<RiWechatLine size={'24px'} />
			</IconButton>
		</Flex>
	)
}

export default SidebarHeader
