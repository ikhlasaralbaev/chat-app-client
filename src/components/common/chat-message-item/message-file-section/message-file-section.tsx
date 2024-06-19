import {
	Box,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from '@chakra-ui/react'
import { imageWithBaseUrl } from 'lib/image/image.helper'
import React from 'react'
import { IFile } from 'services/file/file.types'

type MessageFileSectionProps = {
	file: IFile | null
}

const MessageFileSection: React.FC<MessageFileSectionProps> = ({ file }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	if (!file) return null

	const isImage =
		file.path.includes('.png') ||
		file.path.includes('.jpg') ||
		file.path.includes('.svg') ||
		file.path.includes('.jpeg')

	return (
		<VStack align='start'>
			<HStack spacing={3} w={'full'}>
				{isImage ? (
					<>
						<Box
							as={isImage ? 'button' : 'div'}
							onClick={isImage ? onOpen : undefined}
							cursor={isImage ? 'pointer' : 'default'}
							{...(isImage ? { type: 'button' } : {})}
						>
							<Image
								boxSize='full'
								objectFit='cover'
								src={imageWithBaseUrl(file.path)}
								alt={imageWithBaseUrl(file.path)}
								borderRadius='md'
							/>
						</Box>
					</>
				) : (
					<VStack align='start' spacing={0} maxW='200px'>
						<Text fontSize='sm' isTruncated>
							{file.name}
						</Text>
						<Text fontSize='xs' color='gray.500'>
							{file.size} Kb
						</Text>
					</VStack>
				)}
			</HStack>

			<Modal isOpen={isOpen} onClose={onClose} size='full'>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody display='flex' alignItems='center' justifyContent='center'>
						<Image
							src={imageWithBaseUrl(file.path)}
							alt={imageWithBaseUrl(file.path)}
							maxH='90vh'
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</VStack>
	)
}

export default MessageFileSection
