import { BoardModel } from '../models/board';
import { DisplayOptions, GameOptions } from '../models/control';

export const ACTION_NO_OP = 'ACTION_NO_OP';
export interface NoOpAction {
    type: typeof ACTION_NO_OP,
};

// Board actions.
export const ACTION_UPDATE_BOARD = 'ACTION_UPDATE_BOARD';

export interface UpdateBoardAction {
    type: typeof ACTION_UPDATE_BOARD,
    payload: {
        board: BoardModel,
    },
};

// Control actions.
export const ACTION_UPDATE_DISPLAY = 'ACTION_UPDATE_DISPLAY';
export const ACTION_UPDATE_GAME_PLAY = 'ACTION_UPDATE_GAME_PLAY';

interface UpdateDisplayAction {
    type: typeof ACTION_UPDATE_DISPLAY,
    payload: DisplayOptions,
};

interface UpdateGamePlayAction {
    type: typeof ACTION_UPDATE_GAME_PLAY,
    payload: GameOptions,
}

// History actions.
export const ACTION_REDO = 'ACTION_REDO';
export const ACTION_UNDO = 'ACTION_UNDO';

export interface RedoAction {
    type: typeof ACTION_REDO,
    payload: {
        serialized: string,
    },
};
export interface UndoAction {
    type: typeof ACTION_UNDO,
    payload: {
        serialized: string,
    },
};

// Combine all action types.
export type ActionTypes = NoOpAction
    | UpdateBoardAction
    | UpdateDisplayAction | UpdateGamePlayAction
    | RedoAction | UndoAction;
