import axios from 'axios'
import { AccessRefreshPair } from '../interfaces/auth'
import { playerOpsSocket } from './service'

const baseURL = process.env.NEXT_PUBLIC_PLAYER_OPS_URL

const apiClient = axios.create({
    baseURL,
})

apiClient.interceptors.response.use(
    res => {
        return res
    },
    async err => {
        if (err?.response?.status === 401) {
            const originalRequest = err.config

            const accessToken = localStorage.getItem('access_token')
            const refreshToken = localStorage.getItem('refresh_token')

            const { data } = await axios.post<AccessRefreshPair>(
                `${baseURL}/auth/refresh`,
                {
                    accessToken,
                    refreshToken,
                }
            )

            localStorage.setItem('access_token', data.accessToken)
            localStorage.setItem('refresh_token', data.refreshToken)

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

            const newRequestResponse = await axios(originalRequest)

            return newRequestResponse
        }
        throw err
    }
)

apiClient.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('access_token')
    const socketId = playerOpsSocket.id
    debugger;
    return {
        ...request,
        
        headers: {
            ...request.headers,
            Authorization: `Bearer ${accessToken}`,
            'X-SOCKET-ID': socketId,
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
})

export default apiClient
