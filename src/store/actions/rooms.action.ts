import { createAsyncThunk } from '@reduxjs/toolkit'
import { IFile } from 'services/file/file.types'
import { RoomsService } from 'services/rooms/rooms.service'
import {
	IMySubscribedRooms,
	IRoomCreateRequest,
	IRoomCreateResponse,
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
	async (
		{
			message,
			room,
			replied_message_id,
			file,
		}: {
			message: string
			room: string
			replied_message_id?: string
			file?: IFile
		},
		thunkAPI
	) => {
		try {
			return RoomsService.sendMessage(
				room,
				message,
				replied_message_id,
				file?.id
			)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const createRoom = createAsyncThunk<
	IRoomCreateResponse,
	IRoomCreateRequest
>('rooms/create-room', async (data, thunkAPI) => {
	try {
		return RoomsService.createRoom(data)
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const deleteMessageAction = createAsyncThunk(
	'rooms/delete-msg',
	async ({ message, room }: { message: string; room: string }, thunkAPI) => {
		try {
			return RoomsService.deleteMessage(message, room)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateMessageAction = createAsyncThunk(
	'rooms/update-msg',
	async (
		{
			message,
			message_id,
			file_id,
		}: { message: string; message_id: string; file_id?: number },
		thunkAPI
	) => {
		try {
			return RoomsService.updateMessage(message, message_id, file_id)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const searchRooms = createAsyncThunk(
	'rooms/search-rooms',
	async ({ search }: { search: string }, thunkAPI) => {
		try {
			return RoomsService.searchRooms(search)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
