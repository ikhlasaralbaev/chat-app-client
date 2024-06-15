import {
	Avatar,
	AvatarBadge,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { useAppDispatch } from 'hooks/store.hooks'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'store/slices/auth/auth.slice'

const ProfileBtn = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutFunc = () => {
		const isConfirmed = confirm('Do you want log out?')
		if (isConfirmed) {
			dispatch(logout())
			navigate('/authorization')
		}
	}

	return (
		<Menu>
			<MenuButton>
				<IconButton rounded={'full'} aria-label='profile'>
					<Avatar size={'sm'}>
						<AvatarBadge boxSize='1.25em' bg='green.500' />
					</Avatar>
				</IconButton>
			</MenuButton>
			<MenuList>
				<MenuItem as={Link} to={'/profile'}>
					Profile
				</MenuItem>
				<MenuItem onClick={logoutFunc}>Logout</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default ProfileBtn
