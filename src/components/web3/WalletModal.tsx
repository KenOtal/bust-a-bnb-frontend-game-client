import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { ReactElement, useEffect, useState } from 'react'
import { Alert, Button, Modal as RsuiteModal } from 'rsuite'
import { walletErrorHandler } from '../../constants/authErrors'
import { connectorsByName } from '../../web3Utils/connectors'

const { Header, Title, Body } = RsuiteModal

const WalletModal = ({ setModalOpen }): ReactElement => {
    const { connector, activate } = useWeb3React<Web3Provider>()
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState<any>()
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    const handleConnection = (currentConnector, name): void => {
        setActivatingConnector(currentConnector)
        activate(connectorsByName[name], null, true)
            .then(x => {
                setModalOpen(false)
            })
            .catch(error => {
                Alert.error(walletErrorHandler(error), 5000)
            })
    }

    return (
        <>
            <Header>
                <Title>Accounts</Title>
            </Header>
            <Body>
                {Object.keys(connectorsByName).map(name => {
                    const currentConnector = connectorsByName[name]

                    return (
                        <Button
                            block
                            appearance="primary"
                            key={name}
                            onClick={(): void => {
                                handleConnection(currentConnector, name)
                            }}
                        >
                            {name}
                        </Button>
                    )
                })}
            </Body>
        </>
    )
}

export default WalletModal
