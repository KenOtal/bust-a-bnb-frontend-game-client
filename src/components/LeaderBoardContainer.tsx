import React, { ReactElement, useContext, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import GameContext from '../contexts/game'
import { TEAL } from '../constants/styleConstants'
import { MOBILE, TABLET } from '../constants/constants'

const goUp = keyframes`
 100% {height: 300px; }
`
const goDown = keyframes`
 100% {height: 30px; }
`

const Container = styled.div<{ show: boolean; displayMode: string }>`
    flex: 1;
    background: #1a1a1a;
    ${({ displayMode }): string => displayMode === MOBILE && 'position: fixed;'}
    height: 30px;
    color: white;
    z-index: 9;
    width: 100vw;
    bottom: 0px;
    overflow: hidden;

    ${({ show }): string => {
        if ((show ?? null) === null) {
            return ''
        }
        return show
            ? (css`
                  animation: ${goUp} 0.4s ease 0.1s forwards;
              ` as any)
            : (css`
                  height: 300px;
                  animation: ${goDown} 0.4s ease 0.1s forwards;
              ` as any)
    }}
`

const ShowButton = styled.button`
    outline: none;
    height: 100%;
    flex: 5;
    background: #3e848d;
    transition: all 0.3s ease-out;
`

const Header = styled.div`
    height: 30px;
    display: flex;
`

const Label = styled.span<{ align: string }>`
    flex: 16;
    align-self: center;
    padding-left: 5px;
    text-align: ${({ align }): string => align};
    color: ${TEAL};
`
const Img = styled.img`
    transform: rotate(-90deg);
`

export const LeaderBoardContainer = ({ children }): ReactElement => {
    const [showSwipe, setShowSwipe] = useState(null)

    const { displayMode } = useContext(GameContext)

    const headerForDisplay = (): JSX.Element => {
        if (displayMode === TABLET) {
            return (
                <Header>
                    <Label align="end">CRYPTOASTROAPES</Label>
                </Header>
            )
        }
        if (displayMode === MOBILE) {
            return (
                <Header>
                    <Label align="start">CRYPTOASTROAPES</Label>
                    <ShowButton
                        onClick={(): void => {
                            setShowSwipe(!showSwipe)
                        }}
                    >
                        <Img src="/svgs/arrow.svg" alt="arrow-up" />
                    </ShowButton>
                </Header>
            )
        }
    }

    return (
        <Container displayMode={displayMode} show={showSwipe}>
            {headerForDisplay()}
            <>{children}</>
        </Container>
    )
}
