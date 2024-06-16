import { createAsyncThunk } from '@reduxjs/toolkit'
import { RoomsService } from 'services/rooms/rooms.service'
import {
	IMySubscribedRooms,
	IRoomMessagesResponse,
	Room,
} from 'services/rooms/rooms.types'
import { saveMessages } from 'store/slices/rooms/rooms.slice'

export const subscribedRooms = createAsyncThunk<IMySubscribedRooms>(
	'rooms/subscribed-rooms',
	async (_, thunkAPI) => {
		try {
			return RoomsService.getMySubscribedRooms()
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const roomMessages = createAsyncThunk<
	IRoomMessagesResponse,
	{ roomId: string }
>('rooms/messages', async ({ roomId }, thunkAPI: any) => {
	try {
		const res = await RoomsService.getRoomMessages(roomId)

		const data = {
			room: roomId,
			message: res.data,
		}

		thunkAPI.dispatch(saveMessages(data))
		return res
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const recommendedRooms = createAsyncThunk<{ data: Room[] }>(
	'rooms/recommended-rooms',
	async (_, thunkAPI) => {
		try {
			return RoomsService.getRecommendedRooms()
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const sendMessageAction = createAsyncThunk(
	'rooms/send-message',
	async ({ message, room }: { message: string; room: string }, thunkAPI) => {
		try {
			return RoomsService.sendMessage(room, message)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
