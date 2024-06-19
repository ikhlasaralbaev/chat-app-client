import { IFile } from 'services/file/file.types'

export interface IMySubscribedRooms {
	data: ISubscribedRoom[]
}

export interface ISubscribedRoom {
	_id: string
	updated_at: string
	created_at: string
	chat_room: IRoom
	user: User
	createdBy?: User
	avatar?: string
	messages?: IMessage[]
}

export interface IRoom {
	_id: string
	name: string
	type: string
	info: string
	link: string
	created_by: number
	updated_at: string
	created_at: string
	messages: IMessage[]
}

export interface User {
	id: number
	name: string
	email: string
	email_verified_at: string
	role: string
	avatar: string
	created_at: string
	updated_at: string
}

export interface Pokedex {
	data: Datum[]
}

export interface Datum {
	_id: string
	message: string
	updated_at: string
	created_at: string
	room: Room
	created_by: CreatedBy
}

export interface CreatedBy {
	id: number
	name: string
	email: string
	email_verified_at: string
	role: string
	avatar: string
	created_at: string
	updated_at: string
}

export interface Room {
	_id: string
	name: string
	type: string
	info: string
	link: string
	created_by: number
	updated_at: string
	created_at: string
}

export interface IRoomMessagesResponse {
	data: Datum[]
}

export interface IMessage {
	_id: string
	message: string
	updated_at: string
	created_at: string
	room: Room
	created_by: IMessageCreatedBy
	file?: IFile
	replied_message?: IMessage | null
	replies?: IMessage[] | null
}

export interface IMessageCreatedBy {
	id: number
	name: string
	email: string
	email_verified_at: string
	role: string
	avatar: string
	created_at: string
	updated_at: string
}

export interface Room {
	_id: string
	name: string
	info: string
	link: string
	created_by: number
	updated_at: string
	created_at: string
}

export interface IRoomCreateResponse {
	data: Room
	message: string
}

export interface IRoomCreateRequest {
	name: string
	info: string
	link: string
}
