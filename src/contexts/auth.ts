import { noop } from 'lodash'
import { createContext } from 'react'
import { AuthContext as AuthContextInterface } from '../interfaces/auth'

const AuthContext = createContext<AuthContextInterface>({
    isAuthenticating: true,
    error: false,
    refetchProfile: noop,
    setProfile: noop,
})

export default AuthContext
