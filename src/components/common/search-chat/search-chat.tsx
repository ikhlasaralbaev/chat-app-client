import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

const SearchChat = () => {
	return (
		<InputGroup>
			<InputLeftElement pointerEvents='none'>
				<BiSearch color='gray.300' />
			</InputLeftElement>
			<Input
				variant={'filled'}
				type='tel'
				placeholder='Search (⌘K)'
				_placeholder={{
					textAlign: 'center',
				}}
			/>
		</InputGroup>
	)
}

export default SearchChat
