import { find, isEmpty } from 'lodash'
import React, { ReactElement, useContext } from 'react'
import styled from 'styled-components'
import {
    GAME_CRASHED,
    MOBILE,
    TABLET,
    TAKING_BETS,
} from '../../constants/constants'
import { StateLabels } from '../../constants/gameStateLabels'
import { LIGHT_GREY, GREEN, MULTIPLIER } from '../../constants/styleConstants'
import GameContext from '../../contexts/game'
import { BetsHelper } from '../../helpers/bets'

const Container = styled.div<{ displayMode: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${({ displayMode }): string => {
        if (displayMode === MOBILE) {
            return 'min-height: 230px;'
        }
        if (displayMode === TABLET) {
            return 'min-height: 280px;'
        }
        return ''
    }}
    color: ${MULTIPLIER};
`
const StateLabel = styled.label`
    font-size: 32px;
    margin-top: 50px;
    color: ${LIGHT_GREY};
`

const Multiplier = styled.label<{ displayMode: string }>`
    ${({ displayMode }): string => {
        if (displayMode === MOBILE) {
            return 'font-size: 60px !important; margin-top: 30px;'
        }
        if (displayMode === TABLET) {
            return 'font-size: 70px !important; margin-top: 30px;'
        }
        return 'font-size: 90px; margin-top: 60px;'
    }}
    color: ${MULTIPLIER};
`

const AmountWon = styled.label<{ displayMode: string }>`
    ${({ displayMode }): string => {
        if (displayMode === MOBILE) {
            return 'font-size: 60px; margin-top: 60px;'
        }
        if (displayMode === TABLET) {
            return 'font-size: 70px; margin-top: 60px;'
        }
        return 'font-size: 100px; margin-top: 90px;'
    }}

    text-shadow: 7px 7px 5px rgb(0 0 0 / 75%);
    color: ${GREEN};
`

const Countdown = styled.label<{ marginTop: number }>`
    ${({ marginTop }): string =>
        marginTop ? `margin-top:${marginTop}px;` : null}
    font-size: 40px;
    color: ${LIGHT_GREY};
`

export const State = (): ReactElement => {
    const {
        gameState,
        acceptedBets,
        clientId,
        countdown,
        displayMode,
    } = useContext(GameContext)

    const playersBet = find(acceptedBets, bet => bet.address === clientId)

    const showPlayersWinnings =
        !isEmpty(playersBet) &&
        playersBet.exitMultiplier &&
        gameState.state === GAME_CRASHED

    const showCountdown = gameState.state === TAKING_BETS

    const prettifyValue = (): string => {
        const amountWon = BetsHelper.calculatePlayersWinnings(
            playersBet.amount,
            playersBet.exitMultiplier
        )

        return BetsHelper.uparseAmount(amountWon)
    }

    return (
        <Container displayMode={displayMode}>
            <StateLabel>{StateLabels[gameState.state]}</StateLabel>
            <Multiplier displayMode={displayMode}>
                x{gameState.data?.currentMultiplier?.toFixed(2) ?? 0}
            </Multiplier>
            {showPlayersWinnings && (
                <AmountWon displayMode={displayMode}>
                    +{prettifyValue()}
                </AmountWon>
            )}
            {showCountdown && (
                <>
                    <Countdown marginTop={70}>NEXT ROUND</Countdown>
                    <Countdown
                        marginTop={
                            displayMode === MOBILE || displayMode === TABLET
                                ? 10
                                : 30
                        }
                    >
                        {countdown}
                    </Countdown>
                </>
            )}
        </Container>
    )
}
