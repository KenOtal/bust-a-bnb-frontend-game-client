import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({
    supportedChainIds: [56, 97],
})

enum ConnectorNames {
    MetaMask = 'MetaMask',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.MetaMask]: injected,
}
