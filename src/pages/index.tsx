import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { Notification } from 'rsuite'
import GameComponent from '../components/game/GameComponent'
import { UPDATE_BALANCE } from '../constants/constants'
import AuthContext from '../contexts/auth'
import { User } from '../interfaces/auth'
import authService from '../services/auth.service'
import { playerOpsSocket } from '../services/service'

const Game = (): JSX.Element => {
    const AuthProvider = AuthContext.Provider

    const [profile, setProfile] = useState<User>()
    const [isAuthenticating, setIsAuthenticating] = useState(true)
    const [error, setError] = useState(false)

    const getLibrary = (provider): Web3Provider => {
        const library = new Web3Provider(provider)
        library.pollingInterval = 12000
        return library
    }

    const handleUpdateBalance = profileAddress => ({
        address,
        balance,
        deposit,
    }) => {
        if (address === profileAddress) {
            setProfile(oldProfile => ({
                ...oldProfile,
                balance,
            }))
        }

        if (deposit) {
            Notification.open({
                title: 'New Deposit!',
                duration: 10000,
            })
        }
    }

    const fetchProfile = () => {
        setIsAuthenticating(true)

        authService
            .me()
            .then(res => {
                setProfile(res.data)

                playerOpsSocket.on(
                    UPDATE_BALANCE,
                    handleUpdateBalance(res.data.address)
                )
            })
            .catch(() => setError(true))
            .finally(() => setIsAuthenticating(false))
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <AuthProvider
                value={{
                    isAuthenticating,
                    profile,
                    error,
                    refetchProfile: fetchProfile,
                    setProfile,
                }}
            >
                <GameComponent />
            </AuthProvider>
        </Web3ReactProvider>
    )
}

export default Game
