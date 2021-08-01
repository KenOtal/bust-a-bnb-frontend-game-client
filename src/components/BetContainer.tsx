import React, { useState } from 'react'
import { FlexboxGrid, Col, Whisper, Tooltip } from 'rsuite'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import {
    FOUNTAIN_BLUE,
    CHAR_COAL,
    WHITE,
    BORDER_COLOR,
    LIGHT_GREY,
} from '../constants/styleConstants'
import { Label } from './common/InputLabel'

const { Item } = FlexboxGrid

const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 330px;
    flex-direction: column;
    margin: auto;
`
const CryptoAmountInput = styled(NumberFormat)`
    border: 1px solid ${FOUNTAIN_BLUE};
    background: transparent;
    outline: none;
    padding: 24px 15px;
    min-width: 100px;
    width: 120px;
    border-radius: 4px;
    height: 52px;

    &:disabled {
        opacity: 0.5;
    }
`
const OptionButton = styled.button`
    opacity: 0.5;
    color: ${LIGHT_GREY};
    background: ${CHAR_COAL};
    font-size: 16px;
    padding: 15px;
    border-radius: 4px;
    letter-spacing: 1.78px;
`
const GroupButton = styled.button<{ active: boolean }>`
    opacity: 0.5;
    min-width: 20px;
    width: 76px;
    font-size: 10px;
    background: ${({ active }): string => (active ? '#346268' : 'none')};
    margin-top: 10px;
    border: 1px solid ${BORDER_COLOR};
    color: ${WHITE};
    outline: none;
`

interface BetProps {
    disabled: boolean
}

const BetContainer = React.forwardRef(
    (props: BetProps, ref: React.Ref<HTMLInputElement>) => {
        const [currentMode, setCurrentMode] = useState(0)
        const [currentLevel, setCurrentLevel] = useState(0)
        const modes = ['MANUAL', 'AUTO']
        const levels = ['NORMAL', 'LITE']
        const { disabled } = props

        return (
            <Container>
                <FlexboxGrid>
                    <Label>BET AMOUNT</Label>
                </FlexboxGrid>
                <FlexboxGrid justify="space-between">
                    <Item componentClass={Col}>
                        <CryptoAmountInput
                            disabled={disabled}
                            getInputRef={ref}
                            allowLeadingZeros={false}
                            allowNegative={false}
                            allowEmptyFormatting={false}
                            decimalSeparator="."
                            type="text"
                        />
                    </Item>
                    <Item componentClass={Col}>
                        <OptionButton disabled>1/2</OptionButton>
                    </Item>
                    <Item componentClass={Col}>
                        <OptionButton disabled>X2</OptionButton>
                    </Item>
                    <Item componentClass={Col}>
                        <OptionButton disabled>MAX</OptionButton>
                    </Item>
                </FlexboxGrid>
                <FlexboxGrid justify="space-between">
                    <Item componentClass={Col}>
                        <Whisper
                            placement="top"
                            trigger="hover"
                            speaker={<Tooltip>Coming soon!</Tooltip>}
                        >
                            <span>
                                {levels.map((level, index) => {
                                    const active = index === currentLevel
                                    return (
                                        <GroupButton
                                            disabled
                                            key={level}
                                            active={active}
                                            style={{ pointerEvents: 'none' }}
                                            onClick={(): void => {
                                                setCurrentLevel(index)
                                            }}
                                        >
                                            {level}
                                        </GroupButton>
                                    )
                                })}
                            </span>
                        </Whisper>
                    </Item>

                    <Item componentClass={Col}>
                        {modes.map((mode, index) => {
                            const active = index === currentMode
                            return (
                                <GroupButton
                                    disabled
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
            </Container>
        )
    }
)

export default BetContainer
