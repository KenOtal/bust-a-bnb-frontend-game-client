import React, { FC } from 'react'
import styled from 'styled-components'

interface IconButtonProps {
    img: string
    text: string
    marginRight?: number
    clickable?: boolean
    onClick?: () => void
}
const Container = styled.div<{ marginRight: number; clickable: boolean }>`
    ${({ marginRight }): string => {
        return `margin: 0px ${marginRight}px 0px 0px;`
    }}
    ${({ clickable }): string => clickable && 'cursor: pointer;'}
`
const Label = styled.label``
const ImgContainer = styled.div<{ img: string }>`
    background-image: url(/svgs/${({ img }): string => img});
    background-position-x: center;
    background-position-y: bottom;
    background-repeat: no-repeat;
    background-size: contain;
    height: 30px;
`

const IconButton: FC<IconButtonProps> = ({
    img,
    text,
    marginRight,
    clickable,
    onClick,
}): JSX.Element => {
    return (
        <Container
            clickable={clickable}
            onClick={onClick}
            marginRight={marginRight}
        >
            <ImgContainer img={img} />
            <Label>{text}</Label>
        </Container>
    )
}

export default IconButton
