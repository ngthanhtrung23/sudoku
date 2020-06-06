import { ACTION_NO_OP, ACTION_REDO, ACTION_UNDO, ActionTypes, NoOpAction } from './types';
import { HistoryModel } from '../models/history';

const noOpAction: NoOpAction = { type: ACTION_NO_OP };

export const redo = (history: HistoryModel): ActionTypes => {
    if (history.id >= history.boards.length - 1) {
        // Nothing to redo.
        return noOpAction;
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
        return noOpAction;
    }
    return {
        type: ACTION_UNDO,
        payload: {
            serialized: history.boards[history.id - 1],
        },
    };
};
