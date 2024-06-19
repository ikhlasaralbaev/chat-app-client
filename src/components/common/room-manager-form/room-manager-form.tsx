import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Textarea,
	VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppSelector } from 'hooks/store.hooks'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const roomSchema = yup.object().shape({
	name: yup.string().required('Room name is required'),
	description: yup.string().required('Description is required'),
	link: yup.string().required('Link is required'),
})

export interface IRoomFormInput {
	name: string
	description: string
	link: string
}

interface RoomManagerFormProps {
	initialData?: IRoomFormInput
	onSubmit: (data: IRoomFormInput) => void
}

const RoomManagerForm: React.FC<RoomManagerFormProps> = ({
	initialData,
	onSubmit,
}) => {
	const { isLoading } = useAppSelector(state => state.rooms)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IRoomFormInput>({
		resolver: yupResolver(roomSchema),
		defaultValues: initialData,
	})

	useEffect(() => {
		reset(initialData)
	}, [initialData, reset])

	const handleFormSubmit = (data: IRoomFormInput) => {
		onSubmit(data)
	}

	return (
		<Box
			p={8}
			maxWidth='600px'
			borderWidth={1}
			borderRadius='lg'
			boxShadow='lg'
			mx='auto'
			mt={10}
		>
			<Heading as='h1' size='xl' textAlign='center' mb={6}>
				{initialData ? 'Update Room' : 'Create a New Room'}
			</Heading>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<VStack spacing={4}>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel htmlFor='name'>Room Name</FormLabel>
						<Input
							id='name'
							placeholder='Enter room name'
							{...register('name')}
						/>
						<FormErrorMessage>
							{errors.name && errors.name.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.description}>
						<FormLabel htmlFor='description'>Description</FormLabel>
						<Textarea
							id='description'
							placeholder='Enter room description'
							{...register('description')}
						/>
						<FormErrorMessage>
							{errors.description && errors.description.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.link}>
						<FormLabel htmlFor='link'>Link</FormLabel>
						<Input
							id='link'
							placeholder='Enter room link'
							{...register('link')}
						/>
						<FormErrorMessage>
							{errors.link && errors.link.message}
						</FormErrorMessage>
					</FormControl>

					<Button
						mt={4}
						colorScheme='blue'
						isLoading={isSubmitting || isLoading}
						type='submit'
						width='full'
					>
						{initialData ? 'Update Room' : 'Create Room'}
					</Button>
				</VStack>
			</form>
		</Box>
	)
}

export default RoomManagerForm
