import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { useContext, useState } from 'react'
import { Alert, FlexboxGrid } from 'rsuite'
import styled from 'styled-components'
import { DEEP_BLUE } from '../constants/styleConstants'
import AuthContext from '../contexts/auth'
import authService from '../services/auth.service'
import { playerOpsSocket } from '../services/service'
import IconButton from './IconButton'
import Modal from './Modal'
import WalletModal from './web3/WalletModal'

const HeaderContainer = styled.div`
    background: ${DEEP_BLUE};
    height: 60px;
    display: flex;
    padding: 0px 10px;
`

const Header = (): JSX.Element => {
    const [modalOpen, setModalOpen] = useState(false)
    const [handlingLogout, setHandlingLogout] = useState(false)

    const { deactivate } = useWeb3React<Web3Provider>()

    const { profile, setProfile } = useContext(AuthContext)

    const handleSuccessLogout = () => {
        deactivate()
        setProfile(null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    const handleLogoutError = () => {
        Alert.error('There was a problem closing the session')
    }

    const toggleAuth = (): void => {
        if (playerOpsSocket.id) {
            if (profile) {
                if (handlingLogout) {
                    return
                }

                const refreshToken = localStorage.getItem('refresh_token')

                setHandlingLogout(true)
                authService
                    .logout(refreshToken)
                    .then(handleSuccessLogout)
                    .catch(handleLogoutError)
                    .finally(() => setHandlingLogout(false))
            } else {
                setModalOpen(true)
            }
        }
    }

    return (
        <HeaderContainer>
            <FlexboxGrid
                justify="space-between"
                align="middle"
                style={{ flex: 1 }}
            >
                <img src="/svgs/bust-a-crash-logo.svg" alt="logo" />
                <FlexboxGrid justify="end" align="middle" style={{ flex: 1 }}>
                    <IconButton
                        clickable
                        marginRight={20}
                        img="register-ape.svg"
                        text={profile ? 'Disconnect' : 'Connect'}
                        onClick={toggleAuth}
                    />
                </FlexboxGrid>
            </FlexboxGrid>
            <Modal
                isOpen={modalOpen}
                setOpen={setModalOpen}
                content={<WalletModal setModalOpen={setModalOpen} />}
            />
        </HeaderContainer>
    )
}

export default Header
