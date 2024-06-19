import axiosInstance from 'api/axios.interceptor'
import {
	IAuthService,
	ILoginRequestData,
	ILoginResponse,
	ILoginResponseData,
	IRegisterRequestData,
	IRegisterResponse,
} from './auth.types'

export const AuthService: IAuthService = {
	async register(data: IRegisterRequestData): Promise<IRegisterResponse> {
		const res = await axiosInstance.post('/auth/register', data)

		return res.data
	},
	async login(data: ILoginRequestData): Promise<ILoginResponse> {
		const res = await axiosInstance.post('/auth/login', data)

		return res.data
	},
	async getMe(): Promise<ILoginResponseData> {
		const res = await axiosInstance.get('/auth/profile')
		return res.data.data
	},
	async updateProfile(data) {
		const res = await axiosInstance.put('/auth/profile', data)
		return res.data
	},
}
