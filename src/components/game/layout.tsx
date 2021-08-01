import React, { FC, useContext, useState } from 'react'
import styled from 'styled-components'
import Footer from '../Footer'
import { BLUE } from '../../constants/styleConstants'
import BackgroundSvg from '../BackgroundSvg'
import Header from '../Header'
import LeftColumn from '../LeftColumn'
import RightColumn from '../RightColumn'
import GameContext from '../../contexts/game'
import MobileHeader from '../MobileHeader'
import { LeaderBoard } from '../LeaderBoard'
import { LeaderBoardContainer } from '../LeaderBoardContainer'
import { MOBILE, TABLET } from '../../constants/constants'
import GameAnimation from './GameAnimation'
import WelcomeModal from '../WelcomeModal'

const Layout = styled.div<{ display?: string }>`
    display: flex;

    ${({ display }): string => {
        if (display === TABLET || display === MOBILE) {
            return `
            flex: 1;
            flex-direction: column;
            `
        }

        return `
        flex: 6;
        `
    }}
`
const Main = styled.div`
    flex: 4;
    background-color: ${BLUE};
    z-index: 1;
    display: flex;
    flex-direction: column;
`

const LayoutDiv = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`

export const GameLayout: FC = () => {
    const { displayMode } = useContext(GameContext)
    const [open, setOpen] = useState(true)
    if (displayMode === TABLET || displayMode === MOBILE) {
        return (
            <LayoutDiv>
                <Layout display={displayMode}>
                    <Main>
                        <Header />
                        <MobileHeader />
                        <GameAnimation />
                    </Main>
                    <Footer />
                </Layout>
                <LeaderBoardContainer>
                    <LeaderBoard />
                </LeaderBoardContainer>
            </LayoutDiv>
        )
    }

    return (
        <LayoutDiv>
            <Layout>
                <LeftColumn />
                <Main>
                    <Header />
                    <GameAnimation />
                </Main>
                <BackgroundSvg />
                <RightColumn />
            </Layout>
            <Footer />
            <WelcomeModal
                isOpen={open}
                setOpen={() => {
                    setOpen(false)
                }}
            />
        </LayoutDiv>
    )
}
