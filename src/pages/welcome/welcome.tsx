import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

const Welcome: FC = () => {
	return (
		<Flex
			h={'calc(100vh - 70px)'}
			w={'full'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Text>Select chat for messaging...</Text>
		</Flex>
	)
}

export default Welcome
