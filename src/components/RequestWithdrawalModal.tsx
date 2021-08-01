import React, { ReactElement, useContext, useState } from 'react'
import {
    Modal,
    Form,
    FormGroup,
    Button as RsuiteButton,
    Alert,
    FlexboxGrid,
    FormControl,
    InputGroup,
} from 'rsuite'
import styled from 'styled-components'
import { checkAddressChecksum } from 'ethereum-checksum-address'
import GameContext from '../contexts/game'
import { BetsHelper } from '../helpers/bets'
import WithdrawalService from '../services/withdrawal.service'
import { AccountHelper } from '../helpers/account'
import { BLACK, BORDER_COLOR, TEAL } from '../constants/styleConstants'

const { Header, Body, Footer } = Modal

const Title = styled.h1`
    font-size: 15px;
    font-weight: normal;
`
const Label = styled.span`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`

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
const StyledInput = styled(FormControl)`
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    color: #ffffff;
    border: 1px solid ${BLACK};
    background: ${BLACK};
    display: block;
    width: 100%;
    padding: 15px;
    outline: none;
`
const IconButton = styled.button`
    background: transparent;
`
const MaxButton = styled(InputGroup.Addon)`
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`
const Paragraph = styled.p`
    opacity: 0.5;
`

export interface RequestWithdrawalModalProps {
    show: boolean
    onClose: () => void
}

const RequestWithdrawalModal = ({ show, onClose }): ReactElement => {
    const { setBalance, balance } = useContext(GameContext)
    const [amount, setAmount] = useState('')
    const [transferAddress, setTransferAddress] = useState('')
    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleSubmitRequest = async (): Promise<void> => {
        if (!checkAddressChecksum(transferAddress)) {
            Alert.error('Invalid address', 5000)
            return
        }
        const parsedAmount = BetsHelper.parseAmount(amount)

        try {
            setLoading(true)
            const nonce = AccountHelper.createHash()
            const {
                balance: newBalance,
            } = await WithdrawalService.requestWithdrawal(
                parsedAmount,
                transferAddress,
                nonce
            )
            setBalance(newBalance)
            setAmount('')
            setTransferAddress('')
            setCurrentStep(0)
            onClose()
        } catch (e) {
            Alert.error('Error requesting a withdrawal', 5000)
        } finally {
            setLoading(false)
        }
    }

    const onChangeTransferAddress = (event): void => {
        setTransferAddress(event)
    }

    const handleShowMaxAmount = () => {
        setAmount(BetsHelper.uparseAmount(balance))
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                {currentStep === 0 && (
                    <>
                        <Header>
                            <Title>WITHDRAW BNB</Title>
                        </Header>
                        <Body
                            style={{
                                padding: 15,
                                marginTop: 0,
                                border: `1px solid ${BORDER_COLOR}`,
                            }}
                        >
                            <FlexboxGrid justify="space-between">
                                <Label>Available BNB</Label>
                                <Label>
                                    {balance
                                        ? BetsHelper.uparseAmount(balance)
                                        : '---'}
                                </Label>
                            </FlexboxGrid>
                            <Form fluid>
                                <InputGroup inside style={{ marginBottom: 15 }}>
                                    <StyledInput
                                        value={amount}
                                        onChange={event => setAmount(event)}
                                        placeholder="Amount"
                                    />
                                    <MaxButton
                                        style={{
                                            padding: '12px 14px',
                                            color: TEAL,
                                        }}
                                        onClick={handleShowMaxAmount}
                                    >
                                        max
                                    </MaxButton>
                                </InputGroup>
                                <FormGroup>
                                    <StyledInput
                                        name="address"
                                        value={transferAddress}
                                        onChange={onChangeTransferAddress}
                                        placeholder="Address"
                                    />
                                </FormGroup>
                            </Form>
                            <FlexboxGrid justify="end">
                                <Button
                                    disabled={
                                        !amount || !transferAddress || loading
                                    }
                                    onClick={() => setCurrentStep(1)}
                                >
                                    Withdraw
                                </Button>
                            </FlexboxGrid>
                        </Body>
                    </>
                )}
                {currentStep === 1 && (
                    <>
                        <Header>
                            <IconButton onClick={() => setCurrentStep(0)}>
                                <img src="/svgs/arrow-back.svg" alt="back" />
                            </IconButton>
                        </Header>
                        <Title>WITHDRAW BNB</Title>
                        <Body
                            style={{
                                padding: 15,
                                marginTop: 0,
                                border: `1px solid ${BORDER_COLOR}`,
                            }}
                        >
                            <FlexboxGrid justify="space-between">
                                <Label>Available BNB</Label>
                                <Label>
                                    {balance
                                        ? BetsHelper.uparseAmount(balance)
                                        : '---'}
                                </Label>
                            </FlexboxGrid>
                            <Title>
                                You have requested to withdraw: {amount} BNB
                            </Title>
                            <Paragraph>
                                To complete this transaction click the confirm
                                button below and then follow the prompts from
                                your wallet.
                            </Paragraph>
                        </Body>
                        <Footer>
                            <FlexboxGrid justify="center">
                                <Button
                                    disabled={loading}
                                    onClick={handleSubmitRequest}
                                >
                                    Confirm
                                </Button>
                            </FlexboxGrid>
                        </Footer>
                    </>
                )}
            </Modal>
        </>
    )
}

export default RequestWithdrawalModal
