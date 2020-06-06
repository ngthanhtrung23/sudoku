import { ACTION_UPDATE_DISPLAY, ACTION_UPDATE_GAME_PLAY as ACTION_UPDATE_GAME_OPTIONS, ActionTypes } from './types';
import { DisplayOptions, GameOptions } from '../models/control';


export const updateDisplay = (displayOptions: DisplayOptions): ActionTypes => {
    return {
        type: ACTION_UPDATE_DISPLAY,
        payload: displayOptions,
    };
};

export const updateGameOptions = (gamePlay: GameOptions): ActionTypes => {
    return {
        type: ACTION_UPDATE_GAME_OPTIONS,
        payload: gamePlay,
    }
};
