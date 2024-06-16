import {
	HStack,
	Skeleton,
	SkeletonCircle,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

interface MessageSkeletonProps {
	isOwnMessage?: boolean
}

const MessageSkeleton: React.FC<MessageSkeletonProps> = ({ isOwnMessage }) => {
	return (
		<HStack
			spacing={3}
			alignItems='flex-start'
			alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
			p={4}
			borderRadius='md'
			bg={useColorModeValue('gray.50', 'gray.700')}
			w='350px'
		>
			{!isOwnMessage && (
				<SkeletonCircle size='10' minW={'50px'} height={'50px'} />
			)}
			<VStack spacing={2} alignItems='flex-start' w='full'>
				<Skeleton height='15px' width='50%' transition={'all .3s linear'} />
				<Skeleton height='10px' width='full' />
				<Skeleton height='10px' width='70%' />
			</VStack>
			{isOwnMessage && (
				<SkeletonCircle size='10' minW={'50px'} height={'50px'} />
			)}
		</HStack>
	)
}

export default MessageSkeleton
