/* eslint-disable react/no-unescaped-entities */
import React, { FC, ReactElement } from 'react'
import { Modal, Button as RsuiteButton } from 'rsuite'
import styled from 'styled-components'
import { TEAL } from '../constants/styleConstants'

const { Header, Title, Body, Footer } = Modal

const Button = styled(RsuiteButton)`
    margin-top: 10px;
    padding: 5px 35px;
    border-radius: 4px;
    border: 1px solid ${TEAL};
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    color: ${TEAL};
    background: inherit;

    &:hover {
        color: ${TEAL};
        background: inherit;
        border: 1px solid ${TEAL};
    }

    &:disabled {
        background: inherit;
        opacity: 0.5;
        color: ${TEAL};

        &:hover {
            opacity: 0.5;
            color: ${TEAL};
            background: inherit;
            border: 1px solid ${TEAL};
        }
    }
`

export interface WelcomeModalProps {
    isOpen: boolean
    setOpen: () => void
}

const WelcomeModal: FC<WelcomeModalProps> = ({
    isOpen,
    setOpen,
}): ReactElement => {
    return (
        <Modal show={isOpen} onHide={setOpen}>
            <Header style={{ textAlign: 'center' }}>
                <Title>BUSTaCRASH</Title>
            </Header>
            <Body>
                Welcome to BUSTaCRASH - the flagship game of the BUSTaBNB
                iGaming + DeFi platform. <br />
                <br /> This game is currently in Beta and therefore will have
                some bugs, performance issues and limitations compared to the
                finished product that should be ready by the end of August.{' '}
                <br />
                <br /> First of all, the Beta is running on BSC Testnet only.
                You will be given a balance of 10 TestNet BNB to play with. If
                you run out, you'll need to connect with a new BSC address to
                start again with 10 TestNet BNB. <br />
                <br />
                Secondly, these features are currently disabled: <br /> -
                Deposit and withdraw <br /> - 1/2, X2, MAX, AUTO-bet and
                LITE-mode <br /> - Chat and History <br />
                <br /> Lastly, we'd love your feedback and support! Please join
                our socials to come chat about the game and stay up to date with
                our upcoming IDO :) <br />
                <br />- Telegram:{' '}
                <a
                    href="https://t.me/bustabnbofficial"
                    target="_blank"
                    rel="noreferrer"
                >
                    t.me/bustabnbofficial
                </a>{' '}
                <br /> - Twitter:{' '}
                <a
                    href="https://twitter.com/BUSTaBNB"
                    target="_blank"
                    rel="noreferrer"
                >
                    twitter.com/BUSTaBNB
                </a>{' '}
                <br />- Medium:{' '}
                <a
                    href="https://bustabnb.medium.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    bustabnb.medium.com
                </a>{' '}
                <br /> - Gitbook:{' '}
                <a
                    href="https://docs.bustabnb.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    docs.bustabnb.com
                </a>{' '}
                <br />
            </Body>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                <Button onClick={setOpen}>Understood!</Button>
            </Footer>
        </Modal>
    )
}

export default WelcomeModal
