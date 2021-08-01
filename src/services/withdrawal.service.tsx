import { CurrentBalance } from '../interfaces/withdrawal'
import apiClient from './apiClient'

const withdrawalService = {
    requestWithdrawal: async (
        amount: string,
        transferAddress: string,
        nonce: string
    ): Promise<CurrentBalance> => {
        const { data } = await apiClient.post('/hooks/withdrawal', {
            amount,
            transferAddress,
            nonce,
        })

        return data
    },
}

export default withdrawalService
