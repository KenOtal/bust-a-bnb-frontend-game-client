/* eslint-disable no-undef */
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import styled from 'styled-components'
import {
    disposeGameAnimation,
    initializeGameAnimation,
    updateGameAnimation,
} from 'bust-a-bnb-animation'
import { find, reverse } from 'lodash'
import GameContext from '../../contexts/game'
import { BetsHelper } from '../../helpers/bets'
import { State } from '../../interfaces/game'
// @ts-ignore
import AnimationWorker from './animation.worker'

// MULTIPLIER_INCREASE_INTERVAL is copied from bust-a-bnb-game-engine and used to get semi-reliable time syncing.
// `GameStateData.tickNumber` is relative to the interval set in the backend, and that interval
// is not passed in the responses.
// For now MULTIPLIER_INCREASE_INTERVAL is being hard coded in the client to match the game engine interval,
// But if the game engine changes its interval then most uses of `tickNumber` in the client will break.
// TODO: Provide a reliable, absolute, game engine driven measurement of time elapsed for GameContainer
const MULTIPLIER_INCREASE_INTERVAL = 20

// TODO: This styling works horizontally but only partially works vertically.
// It vertically grows but does not vertically shrink
// Ideally, the GameContainer would fill the remaining bounds of its flex parent without
// being affected by the dimensions of its content
// Each Phaser game tick the canvas element is manually resizing itself to the GameContainer's dimensions
const GameContainer = styled.div`
    width: 100%;
    flex: 1;
`

let worker

const GameAnimationInternal: FunctionComponent = () => {
    const containerRef = useRef(null)
    const [game, setGame] = useState(null)
    const gameContext = useContext(GameContext)
    const {
        gameState: { state: gameState, data: gameData },
        displayMode,
        clientId,
    } = gameContext

    useEffect(() => {
        // initGame()

        return (): void => {
            if (game) {
                disposeGameAnimation(game)
            }
        }
    }, [])

    useEffect(() => {
        if (!game) {
            if (gameState === State.OFF) {
                return
            }

            const container = containerRef.current

            let tickNumber = 0

            if (gameState === State.ROUND_IN_PROGRESS) {
                tickNumber = gameContext?.gameState?.data?.tickNumber
            }

            const elapsedTime =
                (tickNumber * MULTIPLIER_INCREASE_INTERVAL) / 1000

            const animationProps = { defaults: { elapsedTime } }

            const newGame = initializeGameAnimation(container, animationProps)

            setGame(newGame)
        } else if (game) {
            worker = new AnimationWorker()

            worker.postMessage({ state: gameState, data: gameData })

            worker.onmessage = ({ data }) => {
                if (data.state === State.ROUND_IN_PROGRESS) {
                    updateGameAnimation(game, {
                        mode: State.ROUND_IN_PROGRESS,
                        multiplier: data.multiplier,
                        displayMode,
                    })
                }

                if (data.state === State.TAKING_BETS) {
                    const [um = '0', dm = '0', us = '0', ds = '0'] = reverse(
                        data.countdown.toString().split('')
                    )

                    updateGameAnimation(game, {
                        displayMode,
                        mode: State.TAKING_BETS,
                        countdown: `00:${ds}${us}:${dm}${um}`,
                    })
                }
            }

            if (gameState === State.CRASHED) {
                const { exitMultiplier, amount } =
                    find(
                        gameData.acceptedBets,
                        bet => bet.address === clientId
                    ) || {}

                let winnings: string

                if (exitMultiplier) {
                    winnings = BetsHelper.calculatePlayersWinnings(
                        amount,
                        exitMultiplier
                    )
                }

                updateGameAnimation(game, {
                    displayMode,
                    mode: State.CRASHED,
                    multiplier: gameData.currentMultiplier,
                    countdown: '00:05:00',
                    winnings,
                })
            }
        }

        return () => {
            worker?.terminate()
        }
    }, [gameState, game])

    return <GameContainer ref={containerRef} />
}

export default GameAnimationInternal
