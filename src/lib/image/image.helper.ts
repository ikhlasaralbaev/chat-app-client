import { baseUrl } from 'api/axios.interceptor'

export const imageWithBaseUrl = (url: string) => baseUrl + '/app/public/' + url
