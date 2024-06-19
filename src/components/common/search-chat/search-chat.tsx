import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'hooks/store.hooks'
import useDebounce from 'hooks/use-debounce'
import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { searchRooms } from 'store/actions/rooms.action'

const SearchChat = () => {
	const [search, setSearch] = useState<string>('')
	const debouncedValue = useDebounce(search, 300)
	const dispatch = useAppDispatch()
	const { searchedRooms } = useAppSelector(state => state.rooms)

	useEffect(() => {
		if (search.trim().length > 3) {
			dispatch(searchRooms({ search: debouncedValue }))
		}
	}, [debouncedValue])

	return (
		<>
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
					onChange={e => setSearch(e.target.value)}
					value={search}
				/>
			</InputGroup>
		</>
	)
}

export default SearchChat
