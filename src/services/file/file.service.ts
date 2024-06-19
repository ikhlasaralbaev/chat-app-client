import axiosInstance from 'api/axios.interceptor'
import { IFile } from './file.types'

export const FileService = {
	async uploadFile(file: File): Promise<IFile> {
		const formData = new FormData()
		formData.append('file', file)
		const res = await axiosInstance.post<IFile>('/files/upload', formData)
		return res.data
	},
}
