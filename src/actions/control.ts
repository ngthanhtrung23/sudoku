import { DisplayOptions, GameOptions } from '../models/control';

export const ACTION_UPDATE_DISPLAY = 'ACTION_UPDATE_DISPLAY';
export const ACTION_UPDATE_GAME_PLAY = 'ACTION_UPDATE_GAME_PLAY';

interface UpdateDisplayAction {
    type: typeof ACTION_UPDATE_DISPLAY,
    payload: DisplayOptions,
};

interface UpdateGamePlayAction {
    type: typeof ACTION_UPDATE_GAME_PLAY,
    payload: GameOptions,
}

export const updateDisplay = (displayOptions: DisplayOptions): UpdateDisplayAction => {
    return {
        type: ACTION_UPDATE_DISPLAY,
        payload: displayOptions,
    };
};

export const updateGamePlay = (gamePlay: GameOptions): UpdateGamePlayAction => {
    return {
        type: ACTION_UPDATE_GAME_PLAY,
        payload: gamePlay,
    }
};

export type ControlActionTypes = UpdateDisplayAction | UpdateGamePlayAction;
