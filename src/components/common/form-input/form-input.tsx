import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
	name: string
	label: string
	type?: string
}

const FormInput: React.FC<FormInputProps> = ({
	name,
	label,
	type = 'text',
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<FormControl isInvalid={!!errors[name]} mb={4}>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input id={name} type={type} {...register(name)} />
			<FormErrorMessage>{errors ? errors[name]?.message : ''}</FormErrorMessage>
		</FormControl>
	)
}

export default FormInput
