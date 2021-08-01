import { AcceptedBet } from '../interfaces/bet'
import apiClient from './apiClient'

class GameService {
    static async placeBet(
        amount: string,
        targetMultiplier: number
    ): Promise<AcceptedBet> {
        const betResponse = await apiClient.post<AcceptedBet>(`/bets`, {
            amount,
            targetMultiplier,
        })

        return betResponse.data
    }

    static async exitRound(): Promise<AcceptedBet> {
        const { data } = await apiClient.post<AcceptedBet>(`/bets/exit`)

        return data
    }
}

export default GameService
