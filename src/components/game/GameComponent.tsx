import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Alert } from 'rsuite'
import { AuthErrorHandler } from '../../constants/authErrors'

import {
    BET_ACCEPTED,
    COUNT_DOWN,
    EXIT_ROUND_BATCH,
    EXIT_ROUND_SUCCESS,
    GAME_EVENTS,
    MOBILE,
    TABLET,
} from '../../constants/constants'
import AuthContext from '../../contexts/auth'
import GameContext from '../../contexts/game'
import { GameHelper } from '../../helpers/game'
import { AcceptedBet } from '../../interfaces/bet'
import { GameState, GameStateData, State } from '../../interfaces/game'
import authService from '../../services/auth.service'
import { playerOpsSocket } from '../../services/service'
import { GameLayout } from './layout'

const GameComponent = (): JSX.Element => {
    const { Provider } = GameContext
    const { profile, refetchProfile, isAuthenticating } = useContext(
        AuthContext
    )
    const { account, library, chainId, active } = useWeb3React()
    const { deactivate } = useWeb3React<Web3Provider>()

    const [display, setDisplay] = useState('')
    const [balance, setBalance] = useState('')
    const [gameState, setGameState] = useState<GameState>(
        GameHelper.getInitialState()
    )
    const [acceptedBets, setAcceptedBets] = useState<AcceptedBet[]>([])
    const [countdown, setCountdown] = useState('00:00:00')
    const [refreshAcceptedBetsState, setRefreshAcceptedBets] = useState([])

    const signer = useRef(null)

    useEffect(() => {
        if (profile) {
            setBalance(profile.balance)
        } else {
            setBalance('')
        }
    }, [profile])

    const authWallet = async (): Promise<void> => {
        try {
            const challengeString = await authService.getChallengeString(
                playerOpsSocket.id,
                account
            )
            const signature = await signer.current.signMessage(challengeString)
            await authService.getWalletVerification(playerOpsSocket.id, {
                signature,
                address: account,
            })
            refetchProfile()
        } catch (error) {
            deactivate()
            Alert.error(AuthErrorHandler(error), 5000)
        }
    }

    useEffect(() => {
        if (
            !profile &&
            !!library &&
            !!playerOpsSocket.id &&
            !isAuthenticating
        ) {
            signer.current = library.getSigner(account)
            authWallet()
        }
    }, [account, library, chainId, active, profile])

    const mobile = useMediaQuery({
        query: '(min-width: 360px) and (max-width: 480px)',
    })
    const tablet = useMediaQuery({
        query: '(min-width: 481px) and (max-width: 1025px)',
    })
    const isNotMobile = useMediaQuery({ minWidth: 1025 })

    useEffect(() => {
        if (mobile) {
            setDisplay(MOBILE)
        }
        if (tablet && !mobile) {
            setDisplay(TABLET)
        }
        if (isNotMobile && !mobile && !tablet) {
            setDisplay('')
        }
    }, [mobile, tablet, isNotMobile])

    const handleExitsBatch = (exits: AcceptedBet[]) => {
        setAcceptedBets(oldArray => {
            exits.map(exit => {
                const currentBet = oldArray.find(
                    bet => exit.address === bet.address
                )
                currentBet.exitMultiplier = exit.exitMultiplier
                return currentBet
            })
            return oldArray
        })
    }

    const connectSocket = (): void => {
        playerOpsSocket.connect()

        GAME_EVENTS.forEach((state: State) => {
            playerOpsSocket.on(state, (data: GameStateData) => {
                setGameState({
                    state,
                    data,
                })

                if (data.acceptedBets) {
                    setAcceptedBets(data.acceptedBets)
                }

                if (state === State.CRASHED && data.jackpot) {
                    handleExitsBatch(data.jackpotExits || [])
                }
            })
        })

        playerOpsSocket.on(BET_ACCEPTED, (newBet: AcceptedBet) => {
            setAcceptedBets(oldArray => {
                if (oldArray.some(x => x.address === newBet.address)) {
                    return oldArray
                }
                return [...oldArray, newBet]
            })
        })

        playerOpsSocket.on(EXIT_ROUND_SUCCESS, (acceptedBet: AcceptedBet) => {
            setAcceptedBets(oldArray => {
                const betIndex = oldArray.findIndex(
                    x => x.address === acceptedBet.address
                )

                oldArray.splice(betIndex, 1)
                oldArray.push(acceptedBet)
                setRefreshAcceptedBets(oldArray)
                return oldArray
            })
        })

        playerOpsSocket.on(EXIT_ROUND_BATCH, (exits: AcceptedBet[]) => {
            handleExitsBatch(exits)
        })
    }

    playerOpsSocket.on(COUNT_DOWN, data => {
        setCountdown(data)
    })

    const disconnectSocket = (): void => {
        playerOpsSocket.disconnect()
    }

    useEffect(() => {
        if (gameState.state === State.GAME_STARTED) {
            setAcceptedBets([])
        }
    }, [gameState.state])

    useEffect(() => {
        connectSocket()
    }, [])

    return (
        <Provider
            value={{
                clientId: account?.toLowerCase() || profile?.address,
                gameState,
                displayMode: display,
                acceptedBets,
                countdown,
                balance,
                setBalance,
                setAcceptedBets,
                connectSocket,
                disconnectSocket,
            }}
        >
            <GameLayout />
        </Provider>
    )
}

export default GameComponent
