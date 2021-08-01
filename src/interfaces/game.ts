import { Dispatch, SetStateAction } from 'react'
import { AcceptedBet } from './bet'

export enum State {
    GAME_STARTED = 'GAME_STARTED',
    TAKING_BETS = 'TAKING_BETS',
    ROUND_IN_PROGRESS = 'ROUND_IN_PROGRESS',
    CRASHED = 'GAME_CRASHED',
    OFF = 'OFF',
}

export interface GameStateData {
    roundNumber: number
    multiplier?: number
    tickNumber?: number
    timestamp?: number
    currentMultiplier?: number
    seed?: string
    salt?: string
    clientId?: string
    acceptedBets?: AcceptedBet[]
    jackpot?: boolean
    jackpotExits?: AcceptedBet[]
}

export interface GameState {
    state: State
    data: GameStateData
}

export interface GameContext {
    gameState: GameState
    connectSocket: () => void
    disconnectSocket: () => void
    setAcceptedBets: Dispatch<SetStateAction<AcceptedBet[]>>
    clientId: string
    acceptedBets?: AcceptedBet[]
    displayMode?: string
    countdown: string
    balance?: string
    setBalance: (newBalance: string) => void
}
