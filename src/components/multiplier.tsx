import React, { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
`
const Rocket = styled.div`
    z-index: 2;
    height: 178px;
    bottom: 0;
    width: 144px;
    left: 123px;
    background-image: url(/svgs/banana-rocket.svg);
    background-position-x: center;
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: contain;
`

const Number = styled.h2``

const Multiplier: FC<MultiplierProps> = ({ multiplier }) => {
    return (
        <Container>
            <Number>{multiplier}X</Number>
            <Rocket />
        </Container>
    )
}

export default Multiplier

interface MultiplierProps {
    multiplier: number
}
