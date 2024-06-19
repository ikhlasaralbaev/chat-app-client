import { Box, Button, Heading, VStack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { registerSchema } from 'lib/validations/auth.validation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IRegisterRequestData } from 'src/services/auth/auth.types'
import { registerAction } from 'store/actions/auth.action'
import FormInput from '../form-input/form-input'

interface RegisterFormInputs extends IRegisterRequestData {}

const RegisterForm: React.FC = () => {
	const { isLoading } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const toast = useToast()

	const methods = useForm<RegisterFormInputs>({
		resolver: yupResolver(registerSchema),
	})

	const onSubmit = (data: RegisterFormInputs) => {
		dispatch(registerAction(data)).then(res => {
			if (res.type === 'auth/register/fulfilled') {
				toast({
					status: 'success',
					title: 'Registered successfully!',
					position: 'top',
				})
			} else {
				toast({
					status: 'error',
					title: 'User with that email is already exist!',
					position: 'top',
				})
			}
		})
	}

	return (
		<Box width='100%'>
			<Heading mb={6}>Register</Heading>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<VStack spacing={4}>
						<FormInput name='name' label='Name' />
						<FormInput name='email' label='Email' type='email' />
						<FormInput name='password' label='Password' type='password' />
						<Button
							type='submit'
							colorScheme='blue'
							width='full'
							isLoading={isLoading}
						>
							Register
						</Button>
					</VStack>
				</form>
			</FormProvider>
		</Box>
	)
}

export default RegisterForm
