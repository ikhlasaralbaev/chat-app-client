import axios from 'axios'
export const baseUrl = 'http://127.0.0.1:8080'
const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8080/api',
	timeout: 10000,
})

axiosInstance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('chat-token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default axiosInstance
