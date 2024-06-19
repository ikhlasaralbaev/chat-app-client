import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	IMySubscribedRooms,
	IRoomMessagesResponse,
	ISubscribedRoom,
	Room,
} from 'services/rooms/rooms.types'
import {
	createRoom,
	recommendedRooms,
	roomMessages,
	sendMessageAction,
	subscribedRooms,
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
	} | null
	newMessages: IMessageInStateType[]
	recommendedRoomsList: Room[]
	messageIsOpenContextMenu: null | string
	replyToMessage: null | IMessage
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
				state.isLoading = true
			})
			.addCase(sendMessageAction.fulfilled, (state, action) => {
				state.isLoading = false
			})
			.addCase(sendMessageAction.rejected, state => {
				state.isLoading = false
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
	},
})

export const {
	selectedRoom,
	addIncomingMessage,
	saveMessages,
	onContextMenuMessage,
	setReplyToMessage,
} = roomsSlice.actions
export default roomsSlice.reducer
