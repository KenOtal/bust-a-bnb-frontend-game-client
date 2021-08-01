import React, { FC } from 'react'
import styled from 'styled-components'
import AmountContainer from './AmountContainer'

const Container = styled.div`
    background: black;
    height: 100px;
    display: flex;
    justify-content: center;
    padding: 10px;
`

const MobileHeader: FC = () => {
    return (
        <Container>
            <AmountContainer />
        </Container>
    )
}

export default MobileHeader
