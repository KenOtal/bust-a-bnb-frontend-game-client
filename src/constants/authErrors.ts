export const AuthErrors = {
    METAMASK_SIGNATURE_ERROR:
        'There was an error in the wallet signature process',
    CHAIN_ID_ERROR: 'Your current wallet is not in the BNS network',
    METAMASK_INVALID_ADDRESS_ERROR: "You're are sending an invalid address",
    USER_REJECTED_ERROR: 'You rejected the connection',
    GENERIC_ERROR: 'There was an error connecting to wallet',
    ADDRESS_NOT_ALLOWED:
        'The address of the current account is not allowed to connect',
}

export const AuthErrorHandler = (error: any) => {
    if (error?.response?.status === 403) {
        return AuthErrors.ADDRESS_NOT_ALLOWED
    }

    return AuthErrors.METAMASK_SIGNATURE_ERROR
}

export const walletErrorHandler = error => {
    // eslint-disable-next-line no-console
    console.log(error)
    // eslint-disable-next-line no-console
    console.log(error?.name)
    if (error.name === 'UnsupportedChainIdError') {
        return AuthErrors.CHAIN_ID_ERROR
    }
    if (error.name === 'UserRejectedRequestError') {
        return AuthErrors.USER_REJECTED_ERROR
    }
    return AuthErrors.GENERIC_ERROR
}
