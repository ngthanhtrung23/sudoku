import * as KeyCode from 'keycode-js';
import _ from 'lodash';

import { ACTION_UPDATE_BOARD, NO_OP, ActionTypes } from './types';
import { undo, redo } from './history';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';
import { HistoryModel } from '../models/history';

export const updateBoard = (board: BoardModel): ActionTypes => {
    return {
        type: ACTION_UPDATE_BOARD,
        payload: {
            board: board,
        }
    };
};

const pressEsc = (board: BoardModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.clearAllSelections();
    newBoard.clearAllRestricteds();
    newBoard.highlightMatching = null;
    return updateBoard(newBoard);
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

    return updateBoard(newBoard);
}

export const mouseDown = (board: BoardModel, control: ControlModel, cellId: number, clearSelection: boolean): ActionTypes => {
    return select(board, control, cellId, clearSelection, true);
}

export const mouseOver = (board: BoardModel, control: ControlModel, cellId: number): ActionTypes => {
    if (!board.multiSelectMode) {
        return NO_OP;
    }
    return select(board, control, cellId, false);
}

export const mouseUp = (board: BoardModel): ActionTypes => {
    return updateBoard(Object.assign(board, { multiSelectMode: false}));
}

const setValue = (board: BoardModel, control: ControlModel, newValue: CellValue): ActionTypes => {
    let newBoard = _.cloneDeep(board);

    newBoard.clearAllErrors();
    newBoard.setValueOfSelectedCells(
        newValue,
        control.gamePlay,
        control.displayOptions.autoCleanUp);

    if (control.displayOptions.highlightMatchingNumbers) {
        newBoard.highlightMatching = null;

        const selectedValues = newBoard.getSelectedValues();
        if (selectedValues.size === 1) {
            const selectedValue = selectedValues.values().next().value;
            newBoard.highlightMatching = selectedValue;
        }
    }
    return updateBoard(newBoard);
};

const unsetValue = (board: BoardModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);

    newBoard.clearAllErrors();
    newBoard.unsetSelectedCells();

    return updateBoard(newBoard);
};

const toggleCornerValues = (board: BoardModel, newValue: CellValue): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.toggleCornerValuesOfSelectedCells(newValue);

    return updateBoard(newBoard);
}

const toggleCenterValues = (board: BoardModel, newValue: CellValue): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.toggleCenterValuesOfSelectedCells(newValue);
    return updateBoard(newBoard);
}

// Move selected cell in direction (d_row, d_col).
// If there are more than one selected cells, only move the first one.
const move = (board: BoardModel, control: ControlModel, d_row: number, d_col: number): ActionTypes => {
    let r = 0, c = 0;  // by default, assume that we selected (0, 0).
    for (let i = 0; i < 81; i++) {
        if (board.cells[i].selected) {
            [r, c] = board.toRowCol(i);
            break;
        }
    }
    r = (r + d_row + 9) % 9;
    c = (c + d_col + 9) % 9;
    return select(board, control, board.toCellId(r, c));
}

const pressBackspace = (board: BoardModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);

    newBoard.clearAllErrors();
    newBoard.unsetSelectedCells();

    newBoard.clearCornerValuesOfSelectedCells();
    newBoard.clearCenterValuesOfSelectedCells();

    return updateBoard(newBoard);
}

export const keyDown = (board: BoardModel, control: ControlModel, history: HistoryModel, e: any): ActionTypes => {
    let isShift = !!e.shiftKey;
    let isMeta = !!e.metaKey;

    // Pressed 1-9
    if (e.keyCode >= KeyCode.KEY_1 && e.keyCode <= KeyCode.KEY_9) {
        const value = String.fromCharCode(e.keyCode) as CellValue;
        if (isShift) {
            return toggleCornerValues(board, value)
        } else if (isMeta) {
            e.preventDefault();
            return toggleCenterValues(board, value);
        } else {
            return setValue(board, control, value);
        }
    }

    switch (e.keyCode) {
        case KeyCode.KEY_SPACE:
            return unsetValue(board);
        case KeyCode.KEY_BACK_SPACE:
            e.preventDefault();
            return pressBackspace(board);
        case KeyCode.KEY_DOWN:
            return move(board, control, +1, 0);
        case KeyCode.KEY_UP:
            return move(board, control, -1, 0);
        case KeyCode.KEY_LEFT:
            return move(board, control, 0, -1);
        case KeyCode.KEY_RIGHT:
            return move(board, control, 0, +1);
        case KeyCode.KEY_ESCAPE:
            return pressEsc(board);
        case KeyCode.KEY_Z:
        case KeyCode.KEY_U:
            return undo(history);
        case KeyCode.KEY_Y:
        case KeyCode.KEY_R:
            return redo(history);
        default:
    }
    return NO_OP;
}
