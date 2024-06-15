import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface FormFileInputProps {
	name: string
	label: string
}

const FormFileInput: React.FC<FormFileInputProps> = ({ name, label }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<FormControl isInvalid={!!errors[name]} mb={4}>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input id={name} type='file' {...register(name)} />
			<FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
		</FormControl>
	)
}

export default FormFileInput
