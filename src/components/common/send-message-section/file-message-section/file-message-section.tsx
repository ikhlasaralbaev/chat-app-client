import {
	Box,
	Flex,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FiFile, FiTrash2 } from 'react-icons/fi'

type FileMessageSectionProps = {
	file: File | null
	onDelete: () => void
}

const FileMessageSection: React.FC<FileMessageSectionProps> = ({
	file,
	onDelete,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()

	if (!file) return null

	const isImage = file.type.startsWith('image/')
	const fileURL = URL.createObjectURL(file)

	useEffect(() => {
		if (file.size / 1024 > 5000) {
			toast({
				title: 'File size must be max 5 mb!',
				status: 'warning',
				position: 'top',
			})
			onDelete()
		}
	}, [file])

	return (
		<VStack align='start' w={'full'} mb={2}>
			<Flex
				alignItems={'center '}
				justifyContent={'space-between'}
				gap={3}
				w={'full'}
			>
				<Flex alignItems={'center'} gap={4}>
					<Box
						as={isImage ? 'button' : 'div'}
						onClick={isImage ? onOpen : undefined}
						cursor={isImage ? 'pointer' : 'default'}
						{...(isImage ? { type: 'button' } : {})}
					>
						{isImage ? (
							<Image
								boxSize='40px'
								objectFit='cover'
								src={fileURL}
								alt={file.name}
								borderRadius='md'
							/>
						) : (
							<Box
								boxSize='40px'
								bg='gray.200'
								borderRadius='md'
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<FiFile size='24px' />
							</Box>
						)}
					</Box>
					<VStack align='start' spacing={0} maxW='200px'>
						<Text fontSize='sm' isTruncated>
							{file.name}
						</Text>
						<Text fontSize='xs' color='gray.500'>
							{Math.round(file.size / 1024)} KB
						</Text>
					</VStack>
				</Flex>
				<IconButton
					type='button'
					aria-label='Delete file'
					icon={<FiTrash2 />}
					size='sm'
					onClick={onDelete}
				/>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose} size='full'>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody display='flex' alignItems='center' justifyContent='center'>
						<Image src={fileURL} alt={file.name} maxH='90vh' />
					</ModalBody>
				</ModalContent>
			</Modal>
		</VStack>
	)
}

export default FileMessageSection
