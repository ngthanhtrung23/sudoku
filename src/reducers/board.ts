import {
    ACTION_INIT_GAME_STATE,
    ACTION_REDO,
    ACTION_UNDO,
    ACTION_UPDATE_BOARD,
    ActionTypes
    } from '../actions/types';
import { BoardModel } from '../models/board';

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
        return action.payload.board;
    }

    return board;
}
