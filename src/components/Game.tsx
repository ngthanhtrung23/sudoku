import * as KeyCode from 'keycode-js';
import _ from 'lodash';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Board from './board/Board';
import Control from './control/Control';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';
import * as BoardActions from '../actions/board';
import * as HistoryActions from '../actions/history';
import { HistoryModel } from '../models/history';

export type GameState = {
    board: BoardModel,
    control: ControlModel,
    history: HistoryModel,
};

class Game extends React.Component<GameProps, GameState> {
    // Handle mouseover a cell.
    handleMouseOver(cellId: number) {
        if (!this.props.board.multiSelectMode) {
            return;
        }
        console.log('handleMouseOver ' + cellId);
        this.props.select(this.props.board, this.props.control, cellId, false);
    }

    setValueOfSelectedCells(newValue: CellValue) {
        console.log('setValueOfSelectedCells ' + newValue);
        this.clearAllError();

        let newBoard = _.cloneDeep(this.props.board);
        newBoard.setValueOfSelectedCells(
            newValue,
            this.props.control.gamePlay,
            this.props.control.displayOptions.autoCleanUp);
        
        if (this.props.control.displayOptions.highlightMatchingNumbers) {
            newBoard.highlightMatching = null;

            const selectedValues = newBoard.getSelectedValues();
            if (selectedValues.size === 1) {
                const selectedValue = selectedValues.values().next().value;
                newBoard.highlightMatching = selectedValue;
            }
        }
        this.props.updateBoard(newBoard);
    }

    unsetSelectedCells() {
        console.log('unsetSelectedCells');
        this.clearAllError();

        let newBoard = _.cloneDeep(this.props.board);
        newBoard.unsetSelectedCells();

        this.props.updateBoard(newBoard);
    }

    toggleCornerValuesOfSelectedCells(newValue: CellValue) {
        console.log('toggleCornerValuesOfSelectedCells ' + newValue);

        let newBoard = _.cloneDeep(this.props.board);
        newBoard.toggleCornerValuesOfSelectedCells(newValue);

        this.props.updateBoard(newBoard);
    }

    clearCornerValuesOfSelectedCells() {
        console.log('clearCornerValuesOfSelectedCells');
        
        let newBoard = _.cloneDeep(this.props.board);
        newBoard.clearCornerValuesOfSelectedCells();
        this.props.updateBoard(newBoard);
    }

    toggleCenterValuesOfSelectedCells(newValue: CellValue) {
        console.log('toggleCenterValuesOfSelectedCells ' + newValue);

        let newBoard = _.cloneDeep(this.props.board);
        newBoard.toggleCenterValuesOfSelectedCells(newValue);

        this.props.updateBoard(newBoard);
    }

    clearCenterValuesOfSelectedCells() {
        console.log('clearCenterValuesOfSelectedCells');

        let newBoard = _.cloneDeep(this.props.board);
        newBoard.clearCenterValuesOfSelectedCells();
        this.props.updateBoard(newBoard);
    }

    clearAllError() {
        console.log('clearAllError');
        let newBoard = _.cloneDeep(this.props.board);
        newBoard.clearAllErrors();
        this.props.updateBoard(newBoard);
    }

    verifyBoard() {
        console.log('verifyBoard');
        let newBoard = _.cloneDeep(this.props.board);
        newBoard.clearAllErrors();
        let invalidCellIds = newBoard.getInvalidCellIds(this.props.control.gamePlay);
        newBoard.setErrors(invalidCellIds);
        this.props.updateBoard(newBoard);

        alert(invalidCellIds.size > 0 ? 'Error found :(' : 'LGTM!');
    }

    // Move selected cell in direction (d_row, d_col).
    // If there are more than one selected cells, only move the first one.
    moveSelection(d_row: number, d_col: number) {
        let r = 0, c = 0;  // by default, assume that we selected (0, 0).
        for (let i = 0; i < 81; i++) {
            if (this.props.board.cells[i].selected) {
                [r, c] = this.props.board.toRowCol(i);
                break;
            }
        }
        r = (r + d_row + 9) % 9;
        c = (c + d_col + 9) % 9;
        this.props.select(this.props.board, this.props.control, this.props.board.toCellId(r, c));
    }

    // Handle keypress event on a cell.
    handleKeyDown(e: any) {
        console.log('handleKeyDown, keyCode = ' + e.keyCode);

        let isShift = !!e.shiftKey;
        let isMeta = !!e.metaKey;

        // Pressed 1-9
        if (e.keyCode >= KeyCode.KEY_1 && e.keyCode <= KeyCode.KEY_9) {
            const value = String.fromCharCode(e.keyCode) as CellValue;
            if (isShift) {
                this.toggleCornerValuesOfSelectedCells(value)
            } else if (isMeta) {
                this.toggleCenterValuesOfSelectedCells(value);
                e.preventDefault();
            } else {
                this.setValueOfSelectedCells(value);
            }
        }

        switch (e.keyCode) {
            case KeyCode.KEY_SPACE:
                this.unsetSelectedCells();
                break;
            case KeyCode.KEY_BACK_SPACE:
                this.unsetSelectedCells();
                this.clearCornerValuesOfSelectedCells();
                this.clearCenterValuesOfSelectedCells();
                e.preventDefault();
                break;
            case KeyCode.KEY_DOWN:
                this.moveSelection(+1, 0);
                break;
            case KeyCode.KEY_UP:
                this.moveSelection(-1, 0);
                break;
            case KeyCode.KEY_LEFT:
                this.moveSelection(0, -1);
                break;
            case KeyCode.KEY_RIGHT:
                this.moveSelection(0, +1);
                break;
            case KeyCode.KEY_ESCAPE:
                this.props.pressEsc(this.props.board);
                break;
            case KeyCode.KEY_Z:
            case KeyCode.KEY_U:
                this.props.undo(this.props.history);
                break;
            case KeyCode.KEY_Y:
            case KeyCode.KEY_R:
                this.props.redo(this.props.history);
                break;
            default:
        }
    }

    handleClickFillCenter() {
        console.log('handleClickFillCenter');
        let newBoard = _.cloneDeep(this.props.board);
        newBoard.fillAllPossibleValues(this.props.control.gamePlay);
        this.props.updateBoard(newBoard);
    }

    render() {
        return (
            <div
                onKeyDown={(e) => this.handleKeyDown(e)}
                tabIndex={0}
                className="container"
                onMouseUp={() => this.props.updateBoard(Object.assign(this.props.board, { multiSelectMode: false}))}
            >
                <h1>Sudoku Tool</h1>
                <div className="row">
                    <div className="col-sm">
                        <Board
                            board={this.props.board}
                            onClick={(e, id) => this.props.select(this.props.board, this.props.control, id, !e.metaKey)}
                            onMouseDown={(e, id) => this.props.select(this.props.board, this.props.control, id, !e.metaKey, true)}
                            onMouseOver={(i) => this.handleMouseOver(i)}
                        />
                    </div>
                    <div className="col-sm">
                        <Control
                            onClickVerify={() => this.verifyBoard()}
                            onClickUndo={() => this.props.undo(this.props.history)}
                            onClickRedo={() => this.props.redo(this.props.history)}
                            onClickFillCenters={() => this.handleClickFillCenter()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {...state};
};

const connector = connect(mapStateToProps, {
    // history actions.
    redo: HistoryActions.redo,
    undo: HistoryActions.undo,

    // board actions.
    pressEsc: BoardActions.pressEsc,
    select: BoardActions.select,
    updateBoard: BoardActions.updateBoard,
});

type GameProps = ConnectedProps<typeof connector>;

export default connector(Game);
