import Layout from 'components/layout'
import { useAppDispatch } from 'hooks/store.hooks'
import AuthPage from 'pages/auth/auth'
import RecommendedRooms from 'pages/recommended-rooms/recommended-rooms'
import { FC, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getMeAction } from 'store/actions/auth.action'
import { logout } from 'store/slices/auth/auth.slice'
import { Chat, Welcome } from './pages'

const App: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getMeAction()).then(res => {
			if (res.type === 'auth/get-me/rejected') {
				dispatch(logout())
				navigate('/authorization', { replace: true })
			}
		})
	}, [])

	return (
		<Routes>
			<Route path='/authorization' element={<AuthPage />} />
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Welcome />} />
				<Route path='/chat/:roomId' element={<Chat />} />
				<Route path='/recommended-rooms' element={<RecommendedRooms />} />
			</Route>
		</Routes>
	)
}

export default App
