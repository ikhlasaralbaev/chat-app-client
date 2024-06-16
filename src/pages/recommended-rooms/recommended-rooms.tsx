import { Box, SimpleGrid } from '@chakra-ui/react'
import RecommendedBanner from 'components/common/recommended-banner/recommended-banner'
import RoomCard from 'components/common/recommended-room-card/recommended-room-card'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import React, { useEffect } from 'react'
import { recommendedRooms } from 'store/actions/rooms.action'

interface Room {
	id: string
	name: string
	description: string
}

const RecommendedRooms: React.FC = () => {
	const { recommendedRoomsList } = useAppSelector(state => state.rooms)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(recommendedRooms())
	}, [])

	return (
		<Box p={8}>
			<RecommendedBanner
				title='Recommended Rooms'
				subtitle='Join the most popular rooms and start chatting now!'
				backgroundImage='https://images.unsplash.com/photo-1557682250-66f72d3d6d24' // Replace with your desired background image URL
			/>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={8}>
				{recommendedRoomsList.map(room => (
					<RoomCard
						avatarUrl=''
						key={room._id}
						roomName={room.name}
						description={room.info}
						id={room._id}
					/>
				))}
			</SimpleGrid>
		</Box>
	)
}

export default RecommendedRooms
