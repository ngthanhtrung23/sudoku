import assert from 'assert';
import { BoardActionTypes, ACTION_UPDATE_BOARD, ACTION_UNDO, ACTION_REDO } from '../actions/board';
import { HistoryModel } from '../models/history';

export const historyReducer = (history = new HistoryModel(), action: BoardActionTypes) => {
    if (action.type === ACTION_UPDATE_BOARD) {
        const serialized = action.payload.board.serialize();

        // Only update history if the serialized new board is different.
        // Thus, we ignore all selections and restrictions.
        if (serialized !== history.boards[history.id]) {
            // Remove the rest of history.
            // This clean data in case we do lots of undo, and then make a new move.
            history.boards = history.boards.slice(0, history.id + 1);

            // Update history.
            history.boards.push(serialized);
            history.id += 1;
        }
        return history;
    }
    if (action.type === ACTION_UNDO) {
        assert(history.id > 0);
        return {...history, id: history.id - 1 };
    }
    if (action.type === ACTION_REDO) {
        assert(history.id + 1 < history.boards.length);
        return {...history, id: history.id + 1 };
    }
    return history;
}
