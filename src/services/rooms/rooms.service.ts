import axiosInstance from 'api/axios.interceptor'
import {
	IMySubscribedRooms,
	IRoomCreateRequest,
	IRoomCreateResponse,
	Room,
} from './rooms.types'

export const RoomsService = {
	async getMySubscribedRooms(): Promise<IMySubscribedRooms> {
		const res = await axiosInstance.get('/users/subscribed-rooms')
		return res.data
	},
	async getRoomMessages(roomId: string) {
		const res = await axiosInstance.get(`/chats/messages/${roomId}`)
		return res.data
	},
	async getRecommendedRooms(): Promise<{ data: Room[] }> {
		const res = await axiosInstance.get('/chats')
		return res.data
	},
	async joinRoom(room: string) {
		const res = await axiosInstance.post(`/users/join/${room}`)
		return res.data
	},
	async sendMessage(
		room: string,
		message: string,
		replied_message_id?: string,
		file?: number
	) {
		const res = await axiosInstance.post(`/chats/messages/${room}`, {
			message,
			replied_message_id,
			file,
		})
		return res.data
	},
	async createRoom(data: IRoomCreateRequest): Promise<IRoomCreateResponse> {
		const res = await axiosInstance.post<IRoomCreateResponse>('/chats', data)
		return res.data
	},
}
