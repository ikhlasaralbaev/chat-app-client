import { Stack, VStack } from '@chakra-ui/react'
import ChatMessage from 'components/common/chat-message-item/chat-message-item'
import SendMessageForm from 'components/common/send-message-section/send-message-section'

const Chat = () => {
	return (
		<Stack h={'calc(100vh - 70px)'} w={'full'} pos={'relative'}>
			<VStack spacing={4} p={4}>
				<ChatMessage
					avatarUrl='https://bit.ly/sage-adebayo'
					username='John Doe'
					message='Hello, this is a sample message!'
					time='10:30 AM'
					edited={true}
				/>
				<ChatMessage
					avatarUrl='https://bit.ly/ryan-florence'
					username='Jane Smith'
					message='Hi, John! How are you?'
					time='10:32 AM'
				/>
				<ChatMessage
					avatarUrl='https://bit.ly/dan-abramov'
					username='You'
					message="I'm good, thanks! What about you?"
					time='10:35 AM'
					isMyMessage={true}
				/>
				<ChatMessage
					avatarUrl='https://bit.ly/prosper-baba'
					username='John Doe'
					message="I'm doing well, thank you!"
					time='10:37 AM'
					repliedMessage={{
						username: 'You',
						message: "I'm good, thanks! What about you?",
					}}
				/>
				<ChatMessage
					avatarUrl='https://bit.ly/prosper-baba'
					username='John Doe'
					message="I'm doing well, thank you!"
					time='10:37 AM'
					repliedMessage={{
						username: 'You',
						message: "I'm good, thanks! What about you?",
					}}
				/>
				<ChatMessage
					avatarUrl='https://bit.ly/prosper-baba'
					username='John Doe'
					message="I'm doing well, thank you!"
					time='10:37 AM'
					repliedMessage={{
						username: 'You',
						message: "I'm good, thanks! What about you?",
					}}
				/>
			</VStack>
			<SendMessageForm />
		</Stack>
	)
}

export default Chat
