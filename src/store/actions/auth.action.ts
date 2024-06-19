import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from 'services/auth/auth.service'
import {
	ILoginRequestData,
	ILoginResponse,
	ILoginResponseData,
	IRegisterRequestData,
	IRegisterResponse,
} from 'src/services/auth/auth.types'

export const registerAction = createAsyncThunk<
	IRegisterResponse,
	IRegisterRequestData
>('auth/register', async (data, thunkApi) => {
	try {
		const res = await AuthService.register(data)

		return res
	} catch (error) {
		return thunkApi.rejectWithValue(error)
	}
})

export const loginAction = createAsyncThunk<ILoginResponse, ILoginRequestData>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			return await AuthService.login(data)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const getMeAction = createAsyncThunk<ILoginResponseData>(
	'auth/get-me',
	async (_, thunkAPI) => {
		try {
			return AuthService.getMe()
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateProfileAction = createAsyncThunk<
	ILoginResponse,
	{ name?: string; avatar?: string }
>('auth/update-me', async ({ name, avatar }, thunkAPI) => {
	try {
		return AuthService.updateProfile({ name, avatar })
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})
