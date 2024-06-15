import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUIInitialState } from './ui.types'

const initialState: IUIInitialState = {
	sidebarIsOpen: false,
}

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
			state.sidebarIsOpen =
				action.payload === undefined ? !state.sidebarIsOpen : action.payload
		},
	},
})

export const { toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
