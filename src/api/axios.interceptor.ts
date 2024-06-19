import axios from 'axios'
export const baseUrl = 'http://127.0.0.1:8080'
// Create an instance of axios
const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8080/api', // Replace with your API base URL
	timeout: 10000, // optional, set a timeout for requests
})

// Request Interceptor
axiosInstance.interceptors.request.use(
	config => {
		// Add authorization header if token exists
		const token = localStorage.getItem('chat-token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		// Handle request errors
		return Promise.reject(error)
	}
)

export default axiosInstance
