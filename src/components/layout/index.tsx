import { FC, useEffect } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { useAppSelector } from 'hooks/store.hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'

const Layout: FC = () => {
	const { token, isLoading } = useAppSelector(state => state.auth)
	const naviagate = useNavigate()

	useEffect(() => {
		if (!token && !isLoading) {
			naviagate('/authorization', { replace: true })
		}
	}, [token])

	return (
		<Box h={'100vh'}>
			<Flex minH={'calc(100vh)'}>
				<Sidebar />
				<Box
					w={{
						base: '100%',
						md: 'calc(100vw - 320px)',
					}}
					h={'calc(100vh - 70px)'}
					overflowY={'auto'}
				>
					<Header />
					<Outlet />
				</Box>
			</Flex>
		</Box>
	)
}

export default Layout
