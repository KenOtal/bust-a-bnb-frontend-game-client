import { noop } from 'lodash'
import { createContext } from 'react'
import { GameHelper } from '../helpers/game'
import { GameContext as GameContextInterface } from '../interfaces/game'

const GameContext = createContext<GameContextInterface>({
    gameState: GameHelper.getInitialState(),
    connectSocket: noop,
    disconnectSocket: noop,
    setAcceptedBets: noop,
    clientId: '',
    acceptedBets: [],
    displayMode: '',
    countdown: '',
    balance: null,
    setBalance: noop,
})

export default GameContext
