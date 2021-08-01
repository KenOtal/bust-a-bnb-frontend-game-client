import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { injected } from './connectors'

export function useEagerConnect(): any {
    const { activate, active } = useWeb3React()

    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized: boolean) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, [])

    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return tried
}

export function useInactiveListener(suppress = false): any {
    const { active, error, activate } = useWeb3React()

    useEffect((): any => {
        const { ethereum } = window as any
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = (): void => {
                activate(injected)
            }
            const handleChainChanged = (chainId: string | number): void => {
                activate(injected)
            }
            const handleAccountsChanged = (accounts: string[]): void => {
                if (accounts.length > 0) {
                    activate(injected)
                }
            }
            const handleNetworkChanged = (networkId: string | number): void => {
                activate(injected)
            }

            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('networkChanged', handleNetworkChanged)

            return (): void => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener(
                        'accountsChanged',
                        handleAccountsChanged
                    )
                    ethereum.removeListener(
                        'networkChanged',
                        handleNetworkChanged
                    )
                }
            }
        }
    }, [active, error, suppress, activate])
}
