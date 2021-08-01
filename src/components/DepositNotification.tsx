import React from 'react'
import styled from 'styled-components'
import { FOUNTAIN_BLUE } from '../constants/styleConstants'

interface DepositNotificationProps {
    depositAddress: string
}

const Container = styled.div`
    width: 200px;
`

const Title = styled.p`
    font-weight: 500;
    font-size: 20px !important;
    line-height: 28px !important;
    color: #ffffff !important;
`

const Address = styled.span`
    color: ${FOUNTAIN_BLUE} !important;
`

function DepositNotification({ depositAddress }: DepositNotificationProps) {
    return (
        <Container>
            <Title>
                From: <Address>{depositAddress}</Address>
            </Title>
        </Container>
    )
}

export default DepositNotification
