import { HistoryModel } from '../models/history';
import {
    ACTION_REDO,
    ACTION_UNDO,
    ActionTypes,
    NO_OP
    } from './types';


export const redo = (history: HistoryModel): ActionTypes => {
    if (history.id >= history.boards.length - 1) {
        // Nothing to redo.
        return NO_OP;
    }
    return {
        type: ACTION_REDO,
        payload: {
            serialized: history.boards[history.id + 1],
        },
    };
};

export const undo = (history: HistoryModel): ActionTypes => {
    if (history.id === 0) {
        // Nothing to do.
        return NO_OP;
    }
    return {
        type: ACTION_UNDO,
        payload: {
            serialized: history.boards[history.id - 1],
        },
    };
};
