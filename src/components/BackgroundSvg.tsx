import React, { FC } from 'react'
import styled from 'styled-components'

const Background = styled.div`
    border: 2px;
    height: 162px;
    width: 100%;
    position: absolute;
    bottom: 8em;
    background-image: url(/svgs/ground.svg);
    background-position-x: center;
    background-position-y: bottom;
    background-repeat: repeat-x;
    background-size: contain;
`

const Container = styled.div`
    position: absolute;
    bottom: 3.5em;
    width: 100%;
`

const Monkey = styled.div`
    position: absolute;
    z-index: 2;
    height: 259px;
    bottom: 100px;
    width: 180px;
    right: 22px;
    background-image: url(/svgs/apenaut.svg);
    background-position-x: center;
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: contain;
`
const Banana = styled.div`
    position: absolute;
    z-index: 2;
    height: 185px;
    bottom: 100px;
    width: 60px;
    left: 2%;
    background-image: url(/svgs/banalien.svg);
    background-position-x: center;
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: contain;
`
const SpaceShip = styled.div`
    position: absolute;
    z-index: 2;
    height: 178px;
    bottom: 100px;
    width: 144px;
    left: 6%;
    background-image: url(/svgs/flying-saucer.svg);
    background-position-x: center;
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: contain;
`

const BackgroundSvg: FC = () => {
    return (
        <Container>
            <Background />
            <Monkey />
            <Banana />
            <SpaceShip />
        </Container>
    )
}

export default BackgroundSvg
