import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react'
import { FC } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

interface Props extends Omit<IconButtonProps, 'aria-label'> {}

const ToggleColorMode: FC<Props> = ({ ...props }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<IconButton
			fontSize={'20px'}
			onClick={toggleColorMode}
			aria-label='toggle-color-mode'
			colorScheme='blue'
			variant={'ghost'}
			{...props}
		>
			{colorMode === 'dark' ? <BiSun /> : <BiMoon />}
		</IconButton>
	)
}

export default ToggleColorMode
