import { useToast } from '@chakra-ui/react'
import RoomManagerForm, {
	IRoomFormInput,
} from 'components/common/room-manager-form/room-manager-form'
import { useAppDispatch } from 'hooks/store.hooks'
import { createRoom, subscribedRooms } from 'store/actions/rooms.action'

const CreateRoom = () => {
	const dispatch = useAppDispatch()
	const toast = useToast()

	const onCompleteCreateRoom = (data: IRoomFormInput) => {
		dispatch(
			createRoom({
				name: data.name,
				info: data.description,
				link: data.link,
			})
		).then(res => {
			toast({
				title: 'Room created.',
				description: "We've created your room.",
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			dispatch(subscribedRooms())
		})
	}

	return (
		<div>
			<RoomManagerForm onSubmit={onCompleteCreateRoom} />
		</div>
	)
}

export default CreateRoom
