import * as KeyCode from 'keycode-js';
import _ from 'lodash';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';
import { HistoryModel } from '../models/history';
import { redo, undo } from './history';
import {
    ACTION_INIT_GAME_STATE,
    ACTION_UPDATE_BOARD,
    ActionTypes,
    NO_OP
    } from './types';


export const initGameState = (decodedState: any): ActionTypes => {
    const board = new BoardModel();
    for (let i = 0; i < 81; i++) {
        const value = decodedState.values[i];
        if (value !== '0') {
            board.cells[i].value = decodedState.values[i] as CellValue;
            board.cells[i].isFixed = true;
        }
    }
    if (decodedState.rowSandwichSums !== null) {
        for (let i = 0; i < 9; i++) {
            board.rowSandwich[i].value = decodedState.rowSandwichSums[i];
            board.rowSandwich[i].isFixed = true;
        }
    }
    if (decodedState.colSandwichSums !== null) {
        for (let i = 0; i < 9; i++) {
            board.colSandwich[i].value = decodedState.colSandwichSums[i];
            board.colSandwich[i].isFixed = true;
        }
    }
    return {
        type: ACTION_INIT_GAME_STATE,
        payload: {
            board: board,
            gameOptions: decodedState.gameOptions,
        },
    }
};

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
        newBoard.setRestricted(control.gameOptions);
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

export const selectSandwich = (
        board: BoardModel,
        control: ControlModel,
        isRow: boolean,
        id: number): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    if (!control.gameOptions.sandwich) {
        throw new Error('Attempt to select sandwich in normal mode');
    }

    newBoard.clearAllSelections();
    newBoard.clearAllRestricteds();
    newBoard.highlightMatching = null;

    if (isRow) {
        newBoard.rowSandwich[id].selected = true;
    } else {
        newBoard.colSandwich[id].selected = true;
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
        control.gameOptions,
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

const setSandwichValue = (board: BoardModel, newValue: number): ActionTypes => {
    let newBoard = _.cloneDeep(board);

    newBoard.clearAllErrors();
    [...newBoard.rowSandwich, ...newBoard.colSandwich]
        .filter(cell => cell.selected && !cell.isFixed)
        .forEach(cell => {
            if (cell.value === null) cell.value = newValue;
            else if (cell.value < 10) cell.value = cell.value * 10 + newValue;
        });
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
    for (let i = 0; i < 9; i++) {
        if (board.colSandwich[i].selected) {
            r = -1;
            c = i;
            break;
        }
        if (board.rowSandwich[i].selected) {
            r = i;
            c = -1;
        }
    }

    if (control.gameOptions.sandwich) {
        r = (r + d_row + 10) % 10;
        c = (c + d_col + 10) % 10;

        if (r === 9 && c === 9) {
            // This is the empty cell outside board.
            return selectSandwich(board, control, false, 0);
        } else if (r === 9) {
            // Column sandwich
            return selectSandwich(board, control, false, c);
        } else if (c === 9) {
            // Row sandwich
            return selectSandwich(board, control, true, r);
        } else {
            return select(board, control, board.toCellId(r, c));
        }
    } else {
        r = (r + d_row + 9) % 9;
        c = (c + d_col + 9) % 9;
        return select(board, control, board.toCellId(r, c));
    }
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

    // Pressed 0-9
    if (e.keyCode >= KeyCode.KEY_0 && e.keyCode <= KeyCode.KEY_9) {
        if (e.keyCode !== KeyCode.KEY_0 && board.hasSelected()) {
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
        if (board.hasSandwichSelected()) {
            return setSandwichValue(board, +String.fromCharCode(e.keyCode));
        }
        return NO_OP;
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
