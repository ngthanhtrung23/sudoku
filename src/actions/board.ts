import { BoardModel } from '../models/board';

export const ACTION_REDO = 'ACTION_REDO';
export const ACTION_UNDO = 'ACTION_UNDO';
export const ACTION_UPDATE_BOARD = 'ACTION_UPDATE_BOARD';

interface RedoAction {
    type: typeof ACTION_REDO,
    payload: {
        serialized: string,
    },
};
export const redo = (serialized: string): RedoAction => {
    return {
        type: ACTION_REDO,
        payload: {
            serialized,
        },
    };
};

interface UndoAction {
    type: typeof ACTION_UNDO,
    payload: {
        serialized: string,
    },
};
export const undo = (serialized: string): UndoAction => {
    return {
        type: ACTION_UNDO,
        payload: {
            serialized: serialized,
        },
    };
};

interface UpdateBoardAction {
    type: typeof ACTION_UPDATE_BOARD,
    payload: {
        board: BoardModel,
    },
};
export const updateBoard = (board: BoardModel): UpdateBoardAction => {
    return {
        type: ACTION_UPDATE_BOARD,
        payload: {
            board: board,
        }
    };
};

export type BoardActionTypes = RedoAction | UndoAction | UpdateBoardAction;
