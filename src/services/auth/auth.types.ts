export interface IAuthService {
	register(data: IRegisterRequestData): Promise<IRegisterResponse>
	login(data: ILoginRequestData): Promise<ILoginResponse>
	getMe(): Promise<ILoginResponseData>
	updateProfile(data: {
		name?: string
		avatar?: string
	}): Promise<ILoginResponse>
}

export type CallbackWithStatusType = (status: number) => void

export interface IRegisterRequestData {
	email: string
	name: string
	password: string
	callback?: CallbackWithStatusType
}

export interface IRegisterResponse {
	user: IRegisterResponseUser
	token: string
}

export interface IRegisterResponseUser {
	email: string
	name: string
	updated_at: Date
	created_at: Date
	id: number
	avatar: string
}

export interface ILoginRequestData {
	email: string
	password: string
	callback?: CallbackWithStatusType
}

export interface ILoginResponse {
	user: ILoginResponseData
	token: string
}

export interface ILoginResponseData {
	id: number
	name: string
	email: string
	email_verified_at: Date
	role: string
	avatar: string
	created_at: Date
	updated_at: Date
}

export interface IUserType {
	email: string
	id: number
	name: string
	avatar?: string
}
