import _ from 'lodash';

import { ACTION_UPDATE_BOARD, ActionTypes } from './types';
import { BoardModel } from '../models/board';
import { ControlModel } from '../models/control';

export const updateBoard = (board: BoardModel): ActionTypes => {
    return {
        type: ACTION_UPDATE_BOARD,
        payload: {
            board: board,
        }
    };
};

export const pressEsc = (board: BoardModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.clearAllSelections();
    newBoard.clearAllRestricteds();
    newBoard.highlightMatching = null;
    return {
        type: ACTION_UPDATE_BOARD,
        payload: {
            board: newBoard,
        },
    };
}

export const select = (
        board: BoardModel,
        control: ControlModel,
        cellId: number,
        clearSelection: boolean = true,
        setMultiSelect: boolean | null = null
        ): ActionTypes => {
    let newBoard = _.cloneDeep(board);

    if (setMultiSelect !== null) {
        newBoard.multiSelectMode = setMultiSelect;
    }

    if (clearSelection) {
        newBoard.clearAllSelections();
        newBoard.clearAllRestricteds();
        newBoard.highlightMatching = null;
    } else {
        newBoard.clearAllRestricteds();
    }

    newBoard.setSelected(cellId);

    if (control.displayOptions.highlightRestricted) {
        newBoard.setRestricted(control.gamePlay);
    }
    if (control.displayOptions.highlightMatchingNumbers) {
        newBoard.highlightMatching = null;

        const selectedValues = newBoard.getSelectedValues();
        if (selectedValues.size === 1) {
            const selectedValue = selectedValues.values().next().value;
            newBoard.highlightMatching = selectedValue;
        }
    }

    return {
        type: ACTION_UPDATE_BOARD,
        payload: {
            board: newBoard,
        },
    };
}
