import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	IMySubscribedRooms,
	IRoomMessagesResponse,
	ISubscribedRoom,
	Room,
} from 'services/rooms/rooms.types'
import {
	createRoom,
	deleteMessageAction,
	recommendedRooms,
	roomMessages,
	searchRooms,
	sendMessageAction,
	subscribedRooms,
	updateMessageAction,
} from 'store/actions/rooms.action'
import { IMessage } from './../../../services/rooms/rooms.types'

export type IMessageInStateType = {
	room: string
	message: IMessage[]
}

export interface IRoomsInitialState {
	subscribedRooms: ISubscribedRoom[]
	isLoading: boolean
	messages: IMessage[]
	isLoadingMessages: boolean
	selectedRoom: {
		id: string
		name: string
		avatar: string
		link: string
	} | null
	newMessages: IMessageInStateType[]
	recommendedRoomsList: Room[]
	messageIsOpenContextMenu: null | string
	replyToMessage: null | IMessage
	isSendingMessage: boolean
	isDeletingMessage?: boolean
	deleteMessageId: string | null
	updatingMessage: IMessage | null
	searchedRooms: ISubscribedRoom[]
	isSearchingRooms: boolean
}

export const initialState: IRoomsInitialState = {
	subscribedRooms: [],
	isLoading: false,
	messages: [],
	isLoadingMessages: false,
	selectedRoom: null,
	recommendedRoomsList: [],
	newMessages: [],
	messageIsOpenContextMenu: null,
	replyToMessage: null,
	isSendingMessage: false,
	isDeletingMessage: false,
	deleteMessageId: null,
	updatingMessage: null,
	searchedRooms: [],
	isSearchingRooms: false,
}

export const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		selectedRoom: (state, action) => {
			state.selectedRoom = action.payload
		},
		addIncomingMessage: (state, action: PayloadAction<IMessage>) => {
			const roomIndex = state.newMessages.findIndex(
				item => item.room === action.payload.room._id
			)

			if (roomIndex === -1) {
				state.newMessages = [
					...state.newMessages,
					{
						room: action.payload.room._id,
						message: [action.payload],
					},
				]
			} else {
				const msgIndex = state.newMessages[roomIndex].message.findIndex(
					item => item._id === action.payload._id
				)

				if (msgIndex === -1) {
					state.newMessages[roomIndex].message = [
						...state.newMessages[roomIndex].message,
						action.payload,
					]
				} else {
					state.newMessages[roomIndex].message[msgIndex] = action.payload
				}
			}
		},
		deleteMessage: (
			state,
			action: PayloadAction<{ room: string; message: string }>
		) => {
			const data = state.newMessages
			const room = data.findIndex(item => item.room === action.payload.room)

			state.newMessages[room].message = data[room].message.filter(
				item => item._id !== action.payload.message
			)
		},
		saveMessages: (state, action: PayloadAction<IMessageInStateType>) => {
			const index = state.newMessages.findIndex(
				item => item.room === action.payload.room
			)

			if (index === -1) {
				state.newMessages = [...state.newMessages, action.payload]
			} else {
				state.newMessages[index] = action.payload
			}
		},
		onContextMenuMessage: (state, action: PayloadAction<string | null>) => {
			state.messageIsOpenContextMenu = action.payload
		},
		setReplyToMessage: (state, action: PayloadAction<IMessage | null>) => {
			state.replyToMessage = action.payload
		},
		setDeleteMessageId: (state, action: PayloadAction<string | null>) => {
			state.deleteMessageId = action.payload
		},
		onUpdateMessage: (
			state,
			action: PayloadAction<{
				message: string
				message_id: string
				room: string
			}>
		) => {
			const data = state.newMessages
			const room = data.findIndex(item => item.room === action.payload.room)

			state.newMessages[room].message = data[room].message.map(item => {
				if (item._id === action.payload.message_id) {
					return {
						...item,
						message: action.payload.message,
					}
				} else {
					return item
				}
			})
		},
		setUpdatingMessage: (state, action: PayloadAction<IMessage | null>) => {
			state.updatingMessage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(subscribedRooms.pending, state => {
				state.isLoading = true
			})
			.addCase(
				subscribedRooms.fulfilled,
				(state, action: PayloadAction<IMySubscribedRooms>) => {
					state.subscribedRooms = action.payload.data
					state.isLoading = false
				}
			)
			.addCase(subscribedRooms.rejected, state => {
				state.isLoading = false
			})
			.addCase(roomMessages.pending, state => {
				state.isLoadingMessages = true
			})
			.addCase(
				roomMessages.fulfilled,
				(state, action: PayloadAction<IRoomMessagesResponse>) => {
					state.messages = action.payload.data
					state.isLoadingMessages = false
				}
			)
			.addCase(roomMessages.rejected, state => {
				state.isLoadingMessages = false
			})
			.addCase(recommendedRooms.pending, state => {
				state.isLoading = true
			})
			.addCase(
				recommendedRooms.fulfilled,
				(state, action: PayloadAction<{ data: Room[] }>) => {
					state.recommendedRoomsList = action.payload.data
					state.isLoading = false
				}
			)
			.addCase(recommendedRooms.rejected, state => {
				state.isLoading = false
			})
			.addCase(sendMessageAction.pending, state => {
				state.isSendingMessage = true
			})
			.addCase(sendMessageAction.fulfilled, (state, action) => {
				state.isSendingMessage = false
			})
			.addCase(sendMessageAction.rejected, state => {
				state.isSendingMessage = false
			})
			.addCase(createRoom.pending, state => {
				state.isLoading = true
			})
			.addCase(createRoom.fulfilled, (state, action) => {
				state.isLoading = false
			})
			.addCase(createRoom.rejected, state => {
				state.isLoading = false
			})
			.addCase(deleteMessageAction.pending, state => {
				state.isDeletingMessage = true
			})
			.addCase(deleteMessageAction.fulfilled, state => {
				state.isDeletingMessage = false
			})
			.addCase(deleteMessageAction.rejected, state => {
				state.isDeletingMessage = false
			})
			.addCase(updateMessageAction.pending, state => {
				state.isDeletingMessage = true
			})
			.addCase(updateMessageAction.fulfilled, state => {
				state.isDeletingMessage = false
			})
			.addCase(updateMessageAction.rejected, state => {
				state.isDeletingMessage = false
			})
			.addCase(searchRooms.pending, state => {
				state.isSearchingRooms = true
			})
			.addCase(searchRooms.fulfilled, (state, action) => {
				state.isSearchingRooms = false
				state.searchedRooms = action.payload
			})
			.addCase(searchRooms.rejected, state => {
				state.isSearchingRooms = false
			})
	},
})

export const {
	selectedRoom,
	addIncomingMessage,
	saveMessages,
	onContextMenuMessage,
	setReplyToMessage,
	deleteMessage,
	setDeleteMessageId,
	onUpdateMessage,
	setUpdatingMessage,
} = roomsSlice.actions
export default roomsSlice.reducer
