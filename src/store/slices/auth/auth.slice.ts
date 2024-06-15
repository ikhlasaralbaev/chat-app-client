import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	ILoginResponseData,
	IRegisterResponse,
	IUserType,
} from 'src/services/auth/auth.types'
import {
	getMeAction,
	loginAction,
	registerAction,
} from 'store/actions/auth.action'

export interface IAuthInitialState {
	isLoading: boolean
	user: IUserType | null
	token?: string | null
}

export const initialState: IAuthInitialState = {
	isLoading: true,
	user: null,
	token: localStorage.getItem('chat-token') || null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			localStorage.removeItem('chat-token')
			state.user = null
			state.token = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerAction.pending, state => {
				state.isLoading = true
			})
			.addCase(
				registerAction.fulfilled,
				(state, action: PayloadAction<IRegisterResponse>) => {
					localStorage.setItem('chat-token', action.payload.token)
					state.user = {
						email: action.payload.user.email,
						name: action.payload.user.name,
						avatar: action.payload.user.avatar,
						id: action.payload.user.id,
					}
					state.token = action.payload.token
					state.isLoading = false
				}
			)
			.addCase(registerAction.rejected, state => {
				state.isLoading = false
			})
			.addCase(loginAction.pending, state => {
				state.isLoading = true
			})
			.addCase(
				loginAction.fulfilled,
				(state, action: PayloadAction<IRegisterResponse>) => {
					localStorage.setItem('chat-token', action.payload.token)
					state.user = {
						email: action.payload.user.email,
						name: action.payload.user.name,
						avatar: action.payload.user.avatar,
						id: action.payload.user.id,
					}
					state.token = action.payload.token
					state.isLoading = false
				}
			)
			.addCase(loginAction.rejected, state => {
				state.isLoading = false
			})
			.addCase(getMeAction.pending, state => {
				state.isLoading = true
			})
			.addCase(
				getMeAction.fulfilled,
				(state, action: PayloadAction<ILoginResponseData>) => {
					localStorage.setItem(
						'chat-token',
						localStorage.getItem('chat-token')!
					)
					state.user = {
						email: action.payload.email,
						name: action.payload.name,
						avatar: action.payload.avatar,
						id: action.payload.id,
					}
					state.isLoading = false
				}
			)
			.addCase(getMeAction.rejected, state => {
				state.isLoading = false
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
