import React, { ReactElement, useContext } from 'react'
import styled from 'styled-components'
import { FlexboxGrid } from 'rsuite'
import { MOBILE, TABLET } from '../constants/constants'
import {
    COAL,
    FOUNTAIN_BLUE,
    LESS_OPACITY_FOUNTAIN_BLUE,
    LESS_OPACITY_TALL_POPPY_RED,
} from '../constants/styleConstants'
import GameContext from '../contexts/game'
import { BetsHelper } from '../helpers/bets'
import { AcceptedBet } from '../interfaces/bet'
import { State } from '../interfaces/game'

interface StyledTableRowProps {
    isOdd?: boolean
    goodExit?: boolean
    crashed?: boolean
    isCurrent?: boolean
}

const Body = styled.tbody<{ displayMode: string }>`
    display: grid;
    overflow-y: auto;
    ${({ displayMode }): string => {
        if (displayMode === TABLET || displayMode === MOBILE) {
            return ` max-height: 18em`
        }
        return ` max-height: 39em`
    }};
`
const TableRow = styled.tr<StyledTableRowProps>`
    font-weight: bold;
    padding: 0px 10px;

    ${({ isOdd, goodExit, isCurrent, crashed }): string => {
        const finalStyle = {
            'font-weight': '',
            color: '',
            background: '',
        }
        if (isCurrent) {
            finalStyle['font-weight'] = '900'
        }
        if (isOdd) {
            finalStyle.background = COAL
        }
        if (goodExit) {
            finalStyle.background = isCurrent
                ? FOUNTAIN_BLUE
                : LESS_OPACITY_FOUNTAIN_BLUE
            finalStyle.color = 'white'
        }
        if (crashed) {
            if (goodExit) {
                finalStyle.background = isCurrent
                    ? FOUNTAIN_BLUE
                    : LESS_OPACITY_FOUNTAIN_BLUE
                finalStyle.color = 'white'
            } else {
                finalStyle.background = LESS_OPACITY_TALL_POPPY_RED
                finalStyle.color = 'white'
                finalStyle['font-weight'] = 'bold'
            }
        }
        return `
        background: ${finalStyle.background};
        color:${finalStyle.color};
        font-weight: ${finalStyle['font-weight']};
        `
    }}
`

export const LeaderBoard = (): ReactElement => {
    const { gameState, clientId, displayMode, acceptedBets } = useContext(
        GameContext
    )

    const prettifyValue = (bet: AcceptedBet): string => {
        if (bet.exitMultiplier) {
            const playerWinnings = BetsHelper.calculatePlayersWinnings(
                bet.amount,
                bet.exitMultiplier
            )
            return `+${BetsHelper.uparseAmount(playerWinnings)}`
        }

        return `-${BetsHelper.uparseAmount(bet.amount)}`
    }

    const sortedAcceptedBets = acceptedBets.sort((bet: AcceptedBet) => {
        if (bet.address === clientId) return -1
        return 1
    })

    const totalAmountWagered = acceptedBets.reduce(
        (a, v) => a + parseInt(v.amount, 10),
        0
    )

    const totalAmountWageredParsed = BetsHelper.uparseAmount(
        String(totalAmountWagered)
    )

    return (
        <Body displayMode={displayMode}>
            {acceptedBets.length > 0 && (
                <FlexboxGrid
                    style={{ padding: '0px 10px' }}
                    justify="space-between"
                >
                    <span>
                        {acceptedBets.length > 1
                            ? `${acceptedBets.length} Players`
                            : `${acceptedBets.length} Player`}
                    </span>
                    <span>${totalAmountWageredParsed}</span>
                </FlexboxGrid>
            )}

            {sortedAcceptedBets.map((bet, i) => {
                const crashed = gameState.state === State.CRASHED

                return (
                    <TableRow
                        isCurrent={bet.address === clientId}
                        isOdd={i % 2 === 0}
                        crashed={crashed}
                        goodExit={!!bet.exitMultiplier}
                        key={i}
                    >
                        <FlexboxGrid justify="space-between" align="middle">
                            <FlexboxGrid.Item>
                                {bet.address?.slice(0, 5)}
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item>
                                {bet.exitMultiplier
                                    ? prettifyValue(bet)
                                    : BetsHelper.uparseAmount(bet.amount)}
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item>
                                {bet.exitMultiplier
                                    ? `x${bet.exitMultiplier.toFixed(2)}`
                                    : '-'}
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </TableRow>
                )
            })}
        </Body>
    )
}
