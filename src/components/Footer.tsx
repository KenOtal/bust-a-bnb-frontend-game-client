import React, { ReactElement, useContext, useRef, useState } from 'react'
import { Alert, Col, FlexboxGrid, Grid } from 'rsuite'
import styled from 'styled-components'
import { BetErrors } from '../constants/betErrors'
import { ExitErrors } from '../constants/exitErrors'
import { MOBILE, TABLET } from '../constants/constants'
import { COAL } from '../constants/styleConstants'
import GameContext from '../contexts/game'
import { BetsHelper } from '../helpers/bets'
import { AcceptedBet } from '../interfaces/bet'
import { State } from '../interfaces/game'
import GameService from '../services/game'
import AmountContainer from './AmountContainer'
import BetContainer from './BetContainer'
import PlayContainer from './PlayContainer'

const { Item } = FlexboxGrid

interface ComponentContainerProps {
    displayMode?: string
}

const Container = styled.div`
    background: ${COAL};
`
const FooterContainer = styled(Grid)`
    padding: 20px;
    justify-content: center;
`
const ComponentContainer = styled.div<ComponentContainerProps>`
    display: flex;
    justify-content: center;
    ${({ displayMode }): string => {
        let finalStyleString = ''
        if (displayMode === TABLET || displayMode === MOBILE) {
            finalStyleString +=
                'flex-direction: column; padding:20px; margin-bottom: 20px;'
        }
        if (displayMode === MOBILE) {
            finalStyleString += 'width: 100%; padding:20px;'
        }
        return finalStyleString
    }}
`

const Footer = (): ReactElement => {
    const betAmountRef = useRef(null)
    const targetMultiplierRef = useRef(null)
    const [currentMode, setCurrentMode] = useState(0)
    const {
        gameState,
        clientId,
        acceptedBets,
        displayMode,
        setAcceptedBets,
    } = useContext(GameContext)

    const userAlreadyBet = (): boolean => {
        return !!acceptedBets.find(x => x.address === clientId)
    }

    const handleFailPlaceBet = err => {
        const errorCode = err?.response?.data?.message
        const errorMessage = BetErrors[errorCode] || BetErrors.DEFAULT
        Alert.error(errorMessage, 5000)
    }

    const handleFailExit = err => {
        const errorCode = err?.response?.data?.message
        const errorMessage = ExitErrors[errorCode] || ExitErrors.DEFAULT
        Alert.error(errorMessage, 5000)
    }

    const handlePlaceBet = async (): Promise<void> => {
        if (gameState.state === State.TAKING_BETS) {
            const parsedAmount = BetsHelper.parseAmount(
                betAmountRef.current.value
            )

            const parsedTargetMultiplier = parseFloat(
                targetMultiplierRef?.current?.value
            )

            GameService.placeBet(parsedAmount, parsedTargetMultiplier)
                .then(null, handleFailPlaceBet)
                .catch(handleFailPlaceBet)
        } else if (userAlreadyBet()) {
            GameService.exitRound()
                .then(null, handleFailExit)
                .catch(handleFailExit)
        }
    }

    const isBetContainerDisabled = (): boolean => {
        return userAlreadyBet()
    }

    if (displayMode === TABLET || displayMode === MOBILE) {
        return (
            <Container>
                <ComponentContainer displayMode={displayMode}>
                    <BetContainer
                        disabled={isBetContainerDisabled()}
                        ref={betAmountRef}
                    />
                    <PlayContainer
                        buttonAction={gameState.state}
                        placeBet={handlePlaceBet}
                        ref={targetMultiplierRef}
                        currentMode={currentMode}
                        setCurrentMode={setCurrentMode}
                    />
                </ComponentContainer>
            </Container>
        )
    }

    return (
        <Container>
            <FooterContainer>
                <FlexboxGrid align="middle">
                    <Item componentClass={Col} xs={24} sm={24} md={12} lg={8}>
                        <BetContainer
                            disabled={isBetContainerDisabled()}
                            ref={betAmountRef}
                        />
                    </Item>
                    <Item componentClass={Col} xs={24} sm={24} md={12} lg={8}>
                        <PlayContainer
                            buttonAction={gameState.state}
                            placeBet={handlePlaceBet}
                            ref={targetMultiplierRef}
                            currentMode={currentMode}
                            setCurrentMode={setCurrentMode}
                        />
                    </Item>
                    <Item
                        componentClass={Col}
                        xsHidden
                        smHidden
                        mdHidden
                        lg={8}
                    >
                        <AmountContainer />
                    </Item>
                </FlexboxGrid>
            </FooterContainer>
        </Container>
    )
}

export default Footer
