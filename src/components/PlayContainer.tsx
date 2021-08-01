import { find } from 'lodash'
import React, { useContext } from 'react'
import NumberFormat from 'react-number-format'
import { Col, FlexboxGrid, Loader } from 'rsuite'
import styled from 'styled-components'
import {
    BORDER_COLOR,
    FOUNTAIN_BLUE,
    ORANGE,
    TEAL,
    WHITE,
} from '../constants/styleConstants'
import AuthContext from '../contexts/auth'
import GameContext from '../contexts/game'
import { State } from '../interfaces/game'
import { Label } from './common/InputLabel'

const { Item } = FlexboxGrid

type PlayButtonProps = {
    buttonAction?: string
    disabled?: boolean
}

const Container = styled.div`
    width: 100%;
    max-width: 330px;
    margin: 20px auto 0px;
    display: flex;
    flex-direction: column;
`

const PlayButton = styled.button<PlayButtonProps>`
    display: block;
    height: 44px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    background: ${({ buttonAction }): string =>
        buttonAction === State.TAKING_BETS ? TEAL : ORANGE};
    color: ${WHITE};
    margin-bottom: 10px;
    outline: none;
    opacity: ${({ disabled }): number => disabled && 0.5};
    &:hover {
        opacity: 0.8;
    }
    &:active {
        border: 1px solid ${WHITE};
    }
`
const TargetMultiplierInput = styled(NumberFormat)`
    min-width: 10px;
    width: 100px;
    font-size: 10px;
    background: none;
    margin-top: 10px;
    padding: 0px 20px;
    border: 1px solid ${FOUNTAIN_BLUE};
    color: ${WHITE};
    outline: none;
`
const GroupButton = styled.button<{ active: boolean }>`
    min-width: 40px;
    width: 80px;
    font-size: 10px;
    background: ${({ active }): string => (active ? '#346268' : 'none')};
    margin-top: 10px;
    padding: 0px 20px;
    border: 1px solid ${BORDER_COLOR};
    color: ${WHITE};
    outline: none;
`

interface PlayContainerProps {
    placeBet: () => void
    buttonAction: string
    currentMode: number
    setCurrentMode: (mode: number) => void
}

const PlayContainer = React.forwardRef(
    (props: PlayContainerProps, ref: React.Ref<HTMLInputElement>) => {
        const modes = ['MANUAL', 'AUTO']
        const { gameState, clientId, acceptedBets } = useContext(GameContext)
        const { profile } = useContext(AuthContext)

        const { placeBet, buttonAction, currentMode, setCurrentMode } = props

        const userAlreadyBet = (): boolean => {
            return !!find(acceptedBets, bet => bet.address === clientId)
        }

        const userAlreadyExit = (): boolean => {
            return !!find(
                acceptedBets,
                bet => bet.address === clientId && bet.exitMultiplier
            )
        }

        const handleButtonLabel = (): JSX.Element | string => {
            if (
                buttonAction === State.CRASHED ||
                (buttonAction === State.TAKING_BETS && userAlreadyBet()) ||
                (buttonAction === State.ROUND_IN_PROGRESS && userAlreadyExit())
            ) {
                return 'WAITING...'
            }

            if (buttonAction === State.ROUND_IN_PROGRESS && !userAlreadyBet()) {
                return (
                    <div style={{ marginTop: 8 }}>
                        <Loader />
                    </div>
                )
            }

            if (buttonAction === State.ROUND_IN_PROGRESS && userAlreadyBet()) {
                return 'EJECT'
            }

            return 'PLAY'
        }

        const isButtonDisabled = (): boolean => {
            return (
                !profile ||
                gameState.state === State.CRASHED ||
                (gameState.state === State.ROUND_IN_PROGRESS &&
                    (userAlreadyExit() || !userAlreadyBet())) ||
                (gameState.state === State.TAKING_BETS && userAlreadyBet())
            )
        }

        return (
            <Container>
                <PlayButton
                    disabled={isButtonDisabled()}
                    buttonAction={buttonAction}
                    onClick={placeBet}
                >
                    {handleButtonLabel()}
                </PlayButton>
                <FlexboxGrid justify="space-between" align="bottom">
                    <FlexboxGrid justify="space-between" align="bottom">
                        <Item componentClass={Col} style={{ marginRight: 10 }}>
                            <Label>EJECT</Label>
                        </Item>
                        <Item componentClass={Col}>
                            {modes.map((mode, index) => {
                                const active = index === currentMode
                                return (
                                    <GroupButton
                                        disabled={userAlreadyBet()}
                                        key={mode}
                                        active={active}
                                        onClick={(): void => {
                                            setCurrentMode(index)
                                        }}
                                    >
                                        {mode}
                                    </GroupButton>
                                )
                            })}
                        </Item>
                    </FlexboxGrid>
                    <FlexboxGrid>
                        {currentMode === 1 && (
                            <Item componentClass={Col}>
                                <TargetMultiplierInput
                                    disabled={userAlreadyBet()}
                                    getInputRef={ref}
                                    type="text"
                                    allowLeadingZeros={false}
                                    decimalSeparato="."
                                    allowNegative={false}
                                    allowEmptyFormatting={false}
                                    suffix="x"
                                    decimalScale={2}
                                    isAllowed={values => {
                                        const {
                                            formattedValue,
                                            floatValue,
                                        } = values
                                        return (
                                            formattedValue === '' ||
                                            (floatValue <= 1001 &&
                                                floatValue >= 1)
                                        )
                                    }}
                                />
                            </Item>
                        )}
                    </FlexboxGrid>
                </FlexboxGrid>
            </Container>
        )
    }
)

export default PlayContainer
