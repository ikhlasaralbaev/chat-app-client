import { Box, Button, Heading, VStack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from 'components/common/form-input/form-input'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { loginSchema } from 'lib/validations/auth.validation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { loginAction } from 'store/actions/auth.action'

interface LoginFormInputs {
	email: string
	password: string
}

const LoginForm: React.FC = () => {
	const { isLoading } = useAppSelector(state => state.auth)

	const dispatch = useAppDispatch()
	const toast = useToast()

	const methods = useForm<LoginFormInputs>({
		resolver: yupResolver(loginSchema),
	})

	const onSubmit = (data: LoginFormInputs) => {
		dispatch(loginAction(data)).then(res => {
			if (res.type === 'auth/login/fulfilled') {
				toast({
					status: 'success',
					title: 'Logged in successfully!',
					position: 'top',
				})
			} else {
				toast({
					status: 'error',
					title: 'Login or email incorrect!',
					position: 'top',
				})
			}
		})
	}

	return (
		<Box width='100%'>
			<Heading mb={6}>Login</Heading>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<VStack spacing={4}>
						<FormInput name='email' label='Email' type='email' />
						<FormInput name='password' label='Password' type='password' />
						<Button
							type='submit'
							colorScheme='blue'
							width='full'
							isLoading={isLoading}
						>
							Login
						</Button>
					</VStack>
				</form>
			</FormProvider>
		</Box>
	)
}

export default LoginForm
