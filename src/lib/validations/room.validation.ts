import * as yup from 'yup'

export const roomSchema = yup.object().shape({
	name: yup.string().required('Room name is required'),
	info: yup.string().required('Info is required'),
	link: yup.string().url('Enter a valid URL').required('Link is required'),
})
