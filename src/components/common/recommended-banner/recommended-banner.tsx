import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface BannerProps {
	title: string
	subtitle?: string
	backgroundImage: string
}

const RecommendedBanner: React.FC<BannerProps> = ({ title, subtitle }) => {
	return (
		<Box
			bgPosition='center'
			bgRepeat='no-repeat'
			bgSize='cover'
			color='white'
			p={8}
			borderRadius='lg'
			boxShadow='md'
			textAlign='center'
			bgGradient='linear(to-r, blue.300, blue.600)'
		>
			<VStack spacing={4}>
				<Heading size='xl'>{title}</Heading>
				{subtitle && <Text fontSize='lg'>{subtitle}</Text>}
			</VStack>
		</Box>
	)
}

export default RecommendedBanner
