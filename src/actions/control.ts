import _ from 'lodash';
import { BoardModel } from '../models/board';
import { ControlModel, DisplayOptions, GameOptions } from '../models/control';
import { solveBoard } from '../utils/solver';
import { updateBoard } from './board';
import {
    ACTION_UPDATE_DISPLAY,
    ACTION_UPDATE_GAME_PLAY as ACTION_UPDATE_GAME_OPTIONS,
    ActionTypes,
    NO_OP
    } from './types';



export const fillCenter = (board: BoardModel, control: ControlModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.fillAllPossibleValues(control.gameOptions);
    return updateBoard(newBoard);
}

export const updateDisplay = (displayOptions: DisplayOptions): ActionTypes => {
    return {
        type: ACTION_UPDATE_DISPLAY,
        payload: displayOptions,
    };
};

export const updateGameOptions = (gameOptions: GameOptions): ActionTypes => {
    return {
        type: ACTION_UPDATE_GAME_OPTIONS,
        payload: gameOptions,
    }
};

export const verify = (board: BoardModel, control: ControlModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.clearAllErrors();
    let invalidCellIds = newBoard.getInvalidCellIds(control.gameOptions);
    newBoard.setErrors(invalidCellIds);

    let hasError = invalidCellIds.size > 0;

    for (let i = 0; i < 9; i++) {
        if (!newBoard.rowSandwich[i].isValid()) {
            hasError = true;
            newBoard.rowSandwich[i].error = true;
        } else {
            const want = newBoard.rowSandwich[i].value;
            const has = newBoard.getRowSandwichSum(i);
            if (want !== null && has !== null && want !== has) {
                hasError = true;
                newBoard.rowSandwich[i].error = true;
            }
        }

        if (!newBoard.colSandwich[i].isValid()) {
            hasError = true;
            newBoard.colSandwich[i].error = true;
        } else {
            const want = newBoard.colSandwich[i].value;
            const has = newBoard.getColSandwichSum(i);
            if (want !== null && has !== null && want !== has) {
                hasError = true;
                newBoard.colSandwich[i].error = true;
            }
        }
    }

    alert(hasError ? 'Error found :(' : 'Looks good to me!');
    return updateBoard(newBoard);
}

export const solve = (board: BoardModel, control: ControlModel): ActionTypes => {
    if (control.gameOptions.sandwich) {
        alert('Cannot solve Sandwich Sudoku.');
    }
    let [newBoard, cntSolutions] = solveBoard(board, control);
    if (cntSolutions >= 2) {
        alert('Found at least ' + cntSolutions + ' solutions.');
    } else {
        alert('Found ' + cntSolutions + ' solution.');
    }
    if (newBoard !== null) {
        return updateBoard(newBoard);
    }
    return NO_OP;
}
