import Layout from 'components/layout'
import { useAppDispatch } from 'hooks/store.hooks'
import AuthPage from 'pages/auth/auth'
import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getMeAction } from 'store/actions/auth.action'
import { Chat, Welcome } from './pages'

const App: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getMeAction())
	}, [])

	return (
		<Routes>
			<Route path='/authorization' element={<AuthPage />} />
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Welcome />} />
				<Route path='/chat/:chatId' element={<Chat />} />
			</Route>
		</Routes>
	)
}

export default App
