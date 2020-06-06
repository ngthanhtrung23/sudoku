import { ActionTypes, ACTION_UPDATE_BOARD, ACTION_UNDO, ACTION_REDO } from '../actions/types';
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

    return board;
}
