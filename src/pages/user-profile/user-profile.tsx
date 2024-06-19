import UserProfile from 'components/page-components/user-profile/user-profile'
import { useAppSelector } from 'hooks/store.hooks'

const UserProfilePage = () => {
	const { user } = useAppSelector(state => state.auth)
	return <UserProfile />
}

export default UserProfilePage
