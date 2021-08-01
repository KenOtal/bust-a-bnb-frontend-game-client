import { GameState, State } from '../interfaces/game'

export class GameHelper {
    static getInitialState(): GameState {
        return {
            state: State.OFF,
            data: {
                roundNumber: 0,
            },
        }
    }
}
