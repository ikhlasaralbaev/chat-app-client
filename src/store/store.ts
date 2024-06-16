import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth/auth.slice'
import roomsSlice from './slices/rooms/rooms.slice'
import uiSlice from './slices/ui/ui.slice'

export const store = configureStore({
	reducer: {
		ui: uiSlice,
		auth: authSlice,
		rooms: roomsSlice,
	},
	devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
