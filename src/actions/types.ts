import { BoardModel } from '../models/board';
import { DisplayOptions, GameOptions } from '../models/control';

export const ACTION_NO_OP = 'ACTION_NO_OP';
export interface NoOpAction {
    type: typeof ACTION_NO_OP,
};
export const NO_OP: NoOpAction = { type: ACTION_NO_OP };

// Board actions.
export const ACTION_UPDATE_BOARD = 'ACTION_UPDATE_BOARD';
export const ACTION_GENERATE_URL = 'ACTION_GENERATE_URL';
export const ACTION_INIT_GAME_STATE = 'ACTION_INIT_GAME_STATE';

export interface UpdateBoardAction {
    type: typeof ACTION_UPDATE_BOARD,
    payload: {
        board: BoardModel,
    },
};
export interface GenerateUrlAction {
    type: typeof ACTION_GENERATE_URL,
    payload: {
        url: string,
    },
};
export interface InitGameStateAction {
    type: typeof ACTION_INIT_GAME_STATE,
    payload: {
        values: string,
        rowSandwichSums: Array<number|null>,
        colSandwichSums: Array<number|null>,
        gameOptions: GameOptions,
    }
};

// Control actions.
export const ACTION_UPDATE_DISPLAY = 'ACTION_UPDATE_DISPLAY';
export const ACTION_UPDATE_GAME_PLAY = 'ACTION_UPDATE_GAME_PLAY';

interface UpdateDisplayAction {
    type: typeof ACTION_UPDATE_DISPLAY,
    payload: DisplayOptions,
};

interface UpdateGameOptionsAction {
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
    | UpdateBoardAction | GenerateUrlAction | InitGameStateAction
    | UpdateDisplayAction | UpdateGameOptionsAction
    | RedoAction | UndoAction;
