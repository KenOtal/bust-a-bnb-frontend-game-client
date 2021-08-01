import { Signature, User } from '../interfaces/auth'
import apiClient from './apiClient'

interface Tokens {
    accessToken: string
    refreshToken: string
}

interface AuthResponse extends Tokens {
    balance: string
}

const authService = {
    getChallengeString: async (
        socketId: string,
        address: string
    ): Promise<string> => {
        const { data } = await apiClient.post<string>(
            `/auth/${socketId}/challenge`,
            {
                address,
            }
        )

        return data
    },
    getWalletVerification: async (
        socketId: string,
        body: Signature
    ): Promise<string> => {
        const { data } = await apiClient.post<AuthResponse>(
            `/auth/${socketId}/verify`,
            { ...body }
        )

        localStorage.setItem('access_token', data.accessToken)
        localStorage.setItem('refresh_token', data.refreshToken)
        return BigInt(data.balance).toString()
    },
    getTokenFromLocalStorage: (): Tokens => {
        let accessToken = ''
        let refreshToken = ''

        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('access_token')
            refreshToken = localStorage.getItem('refresh_token')
        }
        return { accessToken, refreshToken }
    },
    me: () => apiClient.get<User>('/auth/me'),
    logout: (refreshToken: string) =>
        apiClient.post('/auth/logout', { refreshToken }),
}

export default authService
