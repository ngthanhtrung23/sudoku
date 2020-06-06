import _ from 'lodash';

import { ACTION_UPDATE_DISPLAY, ACTION_UPDATE_GAME_PLAY as ACTION_UPDATE_GAME_OPTIONS, ActionTypes } from './types';
import { BoardModel } from '../models/board';
import { ControlModel, DisplayOptions, GameOptions } from '../models/control';
import { updateBoard } from './board';


export const fillCenter = (board: BoardModel, control: ControlModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.fillAllPossibleValues(control.gamePlay);
    return updateBoard(newBoard);
}

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

export const verify = (board: BoardModel, control: ControlModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.clearAllErrors();
    let invalidCellIds = newBoard.getInvalidCellIds(control.gamePlay);
    newBoard.setErrors(invalidCellIds);

    alert(invalidCellIds.size > 0 ? 'Error found :(' : 'LGTM!');
    return updateBoard(newBoard);
}
