import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import { imageWithBaseUrl } from 'lib/image/image.helper'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FileService } from 'services/file/file.service'
import { updateProfileAction } from 'store/actions/auth.action'
import * as yup from 'yup'

interface ProfileFormInput {
	name: string
}

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
})

const UserProfilePage: React.FC = () => {
	const { user, isLoading } = useAppSelector(state => state.auth)
	const [avatarUrl, setAvatarUrl] = useState<string | null>(
		user?.avatar! || 'https://bit.ly/broken-link'
	)
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProfileFormInput>({
		defaultValues: {
			name: user?.name,
		},
		resolver: yupResolver(schema),
	})
	const toast = useToast()
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<ProfileFormInput> = data => {
		dispatch(updateProfileAction({ name: data.name, avatar: avatarUrl! }))
		toast({
			title: 'Profile Updated',
			description: 'Your profile has been successfully updated!',
			status: 'success',
			duration: 3000,
			isClosable: true,
		})
	}

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			FileService.uploadFile(file).then(res => setAvatarUrl(res.path))
		}
	}

	return (
		<Box p={4}>
			{/* Banner */}
			<Flex
				direction='row'
				align='center'
				bgGradient='linear(to-l, #3182CE, #2B6CB0)'
				borderRadius='lg'
				p={8}
				mb={8}
				gap={4}
				alignItems={'center'}
			>
				<label htmlFor='avatar-upload'>
					<Avatar
						size='xl'
						name='John Doe'
						src={imageWithBaseUrl(avatarUrl!)}
						cursor='pointer'
						_hover={{ opacity: 0.8 }}
					/>
					<input
						id='avatar-upload'
						type='file'
						accept='image/*'
						style={{ display: 'none' }}
						onChange={handleAvatarChange}
					/>
				</label>
				<Stack>
					<Heading size='lg' color='white'>
						{user?.name}
					</Heading>
					<Box color='white'>{user?.email}</Box>
				</Stack>
				{/* Additional user data can be displayed here */}
			</Flex>

			{/* Profile Form */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => <Input {...field} placeholder='Name' />}
					/>
					{errors.name && (
						<Box fontSize='sm' color='red.500'>
							{errors.name.message}
						</Box>
					)}

					<Button type='submit' colorScheme='blue' isLoading={isLoading}>
						Save Changes
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default UserProfilePage
