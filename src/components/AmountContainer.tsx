/* eslint-disable prettier/prettier */
import React, { FC, useContext, useState } from 'react'
import { Dropdown as RsuiteDropdown } from 'rsuite'

import styled from 'styled-components'
import {
    BORDER_COLOR,
    COAL,
    FOUNTAIN_BLUE,
    WHITE,
} from '../constants/styleConstants'
import AuthContext from '../contexts/auth'
import GameContext from '../contexts/game'
import { BetsHelper } from '../helpers/bets'
import { Label } from './common/InputLabel'
import QrModal from './QrModal'
import RequestWithdrawalModal from './RequestWithdrawalModal'

const Container = styled.div<{ displayMode?: string }>`
    align-self: center;
    text-align: center;
`
const AmountDiv = styled.div`
    width: 240px;
    padding: 1px 12px;
    display: flex;
    align-items: center;
    border-right: 0.6278380155563354px solid ${BORDER_COLOR};
`
const TypeDiv = styled.div`
    flex: 1;
    display: flex;
    padding: 10px;
`

const BorderDiv = styled.div`
    width: 310px;
    display: flex;
    border: 0.6278380155563354px solid ${BORDER_COLOR};
    border-radius: 4px;
    height: 52px;
`
const InfoContainer = styled.div`
    display: flex;
    align-items: center;
`
const Type = styled.span`
    font-size: 25px;
    align-self: center;
`
const Dropdown = styled(RsuiteDropdown)`
    .rs-dropdown-toggle {
        &:hover,
        &:focus {
            background: transparent;
        }
    }
    .rs-dropdown-menu {
        border: 1px solid ${FOUNTAIN_BLUE};
        border-radius: inherit;
        background: ${COAL};
    }
`
const Option = styled(Dropdown.Item)`
    .rs-dropdown-item-content {
        color: ${WHITE};
        padding: 5px 25px;

        &:hover,
        &:focus {
            color: ${WHITE} !important;
            background-color: inherit !important;
        }
    }
`
const OptionsIcon = styled.img`
    transform: rotate(90deg);
`

const AmountContainer: FC = () => {
    const { balance } = useContext(GameContext)
    const [openWhitdrawalModal, setOpenWhitdrawalModal] = useState(false)
    const [openQrModal, setQrModalShow] = useState(false)
    const { profile } = useContext(AuthContext)

    const getDropdownButtons = () => {
        if (balance) {
            return (
                <>
                    <Option onClick={(): void => setOpenWhitdrawalModal(true)}>
                        WITHDRAW
                    </Option>
                    <Option onClick={(): void => setQrModalShow(true)}>
                        DEPOSIT
                    </Option>
                </>
            )
        }
        return (
            <>
                <Option onClick={(): void => setQrModalShow(true)}>
                    DEPOSIT
                </Option>
            </>
        )
    }

    return (
        <Container>
            <Label>YOUR BALANCE</Label>
            <InfoContainer>
                <BorderDiv>
                    <AmountDiv>
                        {balance ? BetsHelper.uparseAmount(balance) : '---'}
                    </AmountDiv>
                    <TypeDiv>
                        <Type>BNB</Type>
                    </TypeDiv>
                </BorderDiv>
                {/* {profile && (
                    <Dropdown
                        noCaret
                        title={(
                            <OptionsIcon
                                src="/svgs/three-dots.svg"
                                alt="options"
                            />
                        )}
                        placement="topEnd"
                    >
                        {getDropdownButtons()}
                    </Dropdown>
                )} */}
            </InfoContainer>
            {openWhitdrawalModal && (
                <RequestWithdrawalModal
                    show
                    onClose={(): void => setOpenWhitdrawalModal(false)}
                />
            )}
            <QrModal
                show={openQrModal}
                onClose={() => setQrModalShow(false)}
                depositAddress={profile?.depositAddress}
            />
        </Container>
    )
}

export default AmountContainer
