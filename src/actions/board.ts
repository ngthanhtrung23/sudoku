import { ACTION_UPDATE_BOARD, ActionTypes } from './types';
import { BoardModel } from '../models/board';

export const updateBoard = (board: BoardModel): ActionTypes => {
    return {
        type: ACTION_UPDATE_BOARD,
        payload: {
            board: board,
        }
    };
};
