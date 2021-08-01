import React from 'react'
import * as QRCode from 'qrcode.react'
import { Modal } from 'rsuite'
import styled from 'styled-components'

const { Body, Header, Title } = Modal

const Qr = styled(QRCode)`
    z-index: 10 !important;
    padding: 10px;
`

const Warning = styled.div`
    margin-top: 12px;
    color: orange;
    font-size: 15px;
`

const QrModal = ({ show, onClose, depositAddress }) => {
    const checkDepositAddress = () => {
        if (depositAddress) {
            return (
                <Body style={{ textAlign: 'center' }}>
                    <Qr renderAs="svg" size={256} value={depositAddress} />
                    <span>{depositAddress}</span>
                    <Warning>
                        Please send only TestNet BNB to this Address
                    </Warning>
                </Body>
            )
        }
        return <Title>No Deposit Address</Title>
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Header>
                <Title>Deposit Address</Title>
            </Header>
            {checkDepositAddress()}
        </Modal>
    )
}

export default QrModal
