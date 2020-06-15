import {
    ACTION_INIT_GAME_STATE,
    ACTION_REDO,
    ACTION_UNDO,
    ACTION_UPDATE_BOARD,
    ActionTypes
    } from '../actions/types';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';

export const boardReducer = (board = new BoardModel(), action: ActionTypes) => {
    if (action.type === ACTION_UPDATE_BOARD) {
        return action.payload.board;
    }
    if (action.type === ACTION_UNDO) {
        const board = new BoardModel();
        board.load(action.payload.serialized);
        return board;
    }
    if (action.type === ACTION_REDO) {
        const board = new BoardModel();
        board.load(action.payload.serialized);
        return board;
    }
    if (action.type === ACTION_INIT_GAME_STATE) {
        const board = new BoardModel();
        for (let i = 0; i < 81; i++) {
            const value = action.payload.values[i];
            if (value !== '0') {
                board.cells[i].value = action.payload.values[i] as CellValue;
                board.cells[i].isFixed = true;
            }
        }
        if (action.payload.rowSandwichSums !== null) {
            for (let i = 0; i < 9; i++) {
                board.rowSandwich[i].value = action.payload.rowSandwichSums[i];
                board.rowSandwich[i].isFixed = true;
            }
        }
        if (action.payload.colSandwichSums !== null) {
            for (let i = 0; i < 9; i++) {
                board.colSandwich[i].value = action.payload.colSandwichSums[i];
                board.colSandwich[i].isFixed = true;
            }
        }
        return board;
    }

    return board;
}
