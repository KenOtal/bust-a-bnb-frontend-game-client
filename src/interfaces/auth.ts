import { Dispatch, SetStateAction } from 'react'

export interface Signature {
    signature: string
    address: string
}

export interface ConnectResponse {
    balance: string
    depositAddress: string
}

export interface UpdateBalanceResponse {
    addressId: string
    balance: string
    deposit: boolean
    depositAddress: string
}

export interface AuthContext {
    profile?: User
    isAuthenticating: boolean
    error: boolean
    refetchProfile: () => void
    setProfile: Dispatch<SetStateAction<User>>
}

export interface User {
    address: string
    balance: string
    depositAddress: string
}

export interface AccessRefreshPair {
    accessToken: string
    refreshToken: string
}
