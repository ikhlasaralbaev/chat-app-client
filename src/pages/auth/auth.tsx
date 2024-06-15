import {
	Box,
	Container,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useBreakpointValue,
} from '@chakra-ui/react'
import { AuthBgImage } from 'assets/images'
import LoginForm from 'components/common/login-form/login-form'
import RegisterForm from 'components/common/register-form/register-form'
import ToggleColorMode from 'components/common/toggle-color-mode/toggle-color-mode'
import { useAppSelector } from 'hooks/store.hooks'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthPage: React.FC = () => {
	const navigate = useNavigate()
	const { token } = useAppSelector(state => state.auth)
	const displayImage = useBreakpointValue({ base: 'none', md: 'block' })

	useEffect(() => {
		if (token || localStorage.getItem('chat-token')) {
			return navigate('/', { replace: true })
		}
	}, [token])

	return (
		<Flex height='100vh' direction={{ base: 'column', md: 'row' }}>
			<Box
				flex='1'
				display={displayImage}
				bgImage={`url('${AuthBgImage}')`}
				bgSize='cover'
				bgPosition='center'
			/>
			<Container
				flex='1'
				maxW='md'
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				<Box
					width='100%'
					p={{
						sm: 0,
						md: 4,
					}}
				>
					<ToggleColorMode position={'fixed'} top={4} right={4} />
					<Tabs isFitted variant='enclosed' colorScheme='blue'>
						<TabList mb='1em'>
							<Tab>Register</Tab>
							<Tab>Login</Tab>
						</TabList>
						<TabPanels h={'60vh'}>
							<TabPanel>
								<RegisterForm />
							</TabPanel>
							<TabPanel>
								<LoginForm />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Container>
		</Flex>
	)
}

export default AuthPage
