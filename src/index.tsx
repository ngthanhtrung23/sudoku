import React from 'react';
import ReactDOM from 'react-dom';
import * as KeyCode from 'keycode-js';

import Board from './board';
import Control from './control';
import { BoardModel } from './models/boardModel';
import { CellValue } from './models/cellModel';
import { ControlModel } from './models/controlModel';

import './index.css';

type GameProps = {
};

type GameState = {
    board: BoardModel,
    control: ControlModel,

    history: Array<string>,
    historyId: number,

    isMouseDown: boolean,
    highlightMatching: CellValue,
};

class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            board: new BoardModel(),
            control: new ControlModel(),
            history: [],
            historyId: 0,
            isMouseDown: false,
            highlightMatching: null,
        };
        // Assumption:
        // board is equivalent to history[historyId] at all times.
        this.state.history.push(this.state.board.serialize());
    }
    
    assignNewBoard(board: BoardModel) {
        const serialized = board.serialize();
        let history = this.state.history;
        let historyId = this.state.historyId;

        // Only update history if the serialized new board is different.
        // Thus, we ignore all selections and restrictions.
        if (serialized !== this.state.history[historyId]) {
            // Remove the rest of history.
            // This clean data in case we do lots of undo, and then make a new move.
            history = history.slice(0, historyId + 1);

            // Update history.
            history.push(serialized);
            historyId += 1;
        }

        this.setState({
            board: board,
            history: history,
            historyId: historyId,
        });
    }
    
    undo() {
        if (this.state.historyId === 0) {
            // Nothing to undo.
            return;
        }
        let board = new BoardModel();
        board.load(this.state.history[this.state.historyId - 1]);

        this.setState({
            board: board,
            historyId: this.state.historyId - 1,
        });
    }

    redo() {
        if (this.state.historyId >= this.state.history.length - 1) {
            // Nothing to redo.
            return;
        }
        let board = new BoardModel();
        board.load(this.state.history[this.state.historyId + 1]);

        this.setState({
            board: board,
            historyId: this.state.historyId + 1,
        });
    }

    clearSelectionAndRestricted() {
        console.log('clearSelectionAndRestricted');
        let newBoard = this.state.board;

        newBoard.clearAllSelections();
        newBoard.clearAllRestricteds();

        this.assignNewBoard(newBoard);
        this.setState({highlightMatching: null});
    }

    updateHighlightMatchingNumbers() {
        if (this.state.control.displayOptions.highlightMatchingNumbers) {
            const selectedValues = new Set(
                this.state.board.cells
                    .filter((cell) => cell.selected)
                    .filter((cell) => cell.value)
                    .map((cell) => cell.value)
            );
            if (selectedValues.size === 1) {
                const selectedValue = selectedValues.values().next().value;
                this.setState({highlightMatching: selectedValue});
            }
        }
    }

    // Select a cell.
    select(cellId: number, clearSelection = true) {
        console.log('select ' + cellId);
        let newBoard = this.state.board;
        if (clearSelection) {
            this.clearSelectionAndRestricted();
        } else {
            newBoard.clearAllRestricteds();
        }

        newBoard.setSelected(cellId);

        if (this.state.control.displayOptions.highlightRestricted) {
            newBoard.setRestricted(this.state.control.gamePlay);
        }

        this.assignNewBoard(newBoard);
        this.updateHighlightMatchingNumbers();
    }

    // Handle clicking on a cell.
    handleClick(e: any, cellId: number) {
        console.log('handleClick ' + cellId);
        this.select(cellId, !e.metaKey);
    }

    // Handle mousedown on a cell.
    handleMouseDown(e: any, cellId: number) {
        console.log('handleMouseDown ' + cellId);
        this.setState({isMouseDown: true});

        this.select(cellId, !e.metaKey);
    }

    // Handle mouseover a cell.
    handleMouseOver(cellId: number) {
        if (!this.state.isMouseDown) {
            return;
        }
        console.log('handleMouseOver ' + cellId);
        this.select(cellId, false);
    }

    handleMouseUp() {
        console.log('handleMouseUp');
        this.setState({isMouseDown: false});
    }

    setValueOfSelectedCells(newValue: CellValue) {
        console.log('setValueOfSelectedCells ' + newValue);
        this.clearAllError();

        let newBoard = this.state.board;
        newBoard.setValueOfSelectedCells(
            newValue,
            this.state.control.gamePlay,
            this.state.control.displayOptions.autoCleanUp);

        this.assignNewBoard(newBoard);
        this.updateHighlightMatchingNumbers();
    }

    unsetSelectedCells() {
        console.log('unsetSelectedCells');
        this.clearAllError();

        let newBoard = this.state.board;
        newBoard.unsetSelectedCells();

        this.assignNewBoard(newBoard);
    }

    toggleCornerValuesOfSelectedCells(newValue: CellValue) {
        console.log('toggleCornerValuesOfSelectedCells ' + newValue);

        let newBoard = this.state.board;
        newBoard.toggleCornerValuesOfSelectedCells(newValue);

        this.assignNewBoard(newBoard);
    }

    clearCornerValuesOfSelectedCells() {
        console.log('clearCornerValuesOfSelectedCells');
        
        let newBoard = this.state.board;
        newBoard.clearCornerValuesOfSelectedCells();
        this.assignNewBoard(newBoard);
    }

    toggleCenterValuesOfSelectedCells(newValue: CellValue) {
        console.log('toggleCenterValuesOfSelectedCells ' + newValue);

        let newBoard = this.state.board;
        newBoard.toggleCenterValuesOfSelectedCells(newValue);

        this.assignNewBoard(newBoard);
    }

    clearCenterValuesOfSelectedCells() {
        console.log('clearCenterValuesOfSelectedCells');

        let newBoard = this.state.board;
        newBoard.clearCenterValuesOfSelectedCells();
        this.assignNewBoard(newBoard);
    }

    clearAllError() {
        console.log('clearAllError');
        let newBoard = this.state.board;
        newBoard.clearAllErrors();
        this.assignNewBoard(newBoard);
    }

    verifyBoard() {
        console.log('verifyBoard');
        let newBoard = this.state.board;
        newBoard.clearAllErrors();
        let invalidCellIds = newBoard.getInvalidCellIds(this.state.control.gamePlay);
        newBoard.setErrors(invalidCellIds);
        this.assignNewBoard(newBoard);

        alert(invalidCellIds.size > 0 ? 'Error found :(' : 'LGTM!');
    }

    // Move selected cell in direction (d_row, d_col).
    // If there are more than one selected cells, only move the first one.
    moveSelection(d_row: number, d_col: number) {
        let r = 0, c = 0;  // by default, assume that we selected (0, 0).
        for (let i = 0; i < 81; i++) {
            if (this.state.board.cells[i].selected) {
                console.log(this.state);
                [r, c] = this.state.board.toRowCol(i);
                break;
            }
        }
        r = (r + d_row + 9) % 9;
        c = (c + d_col + 9) % 9;
        this.select(this.state.board.toCellId(r, c));
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
                this.clearSelectionAndRestricted();
                break;
            case KeyCode.KEY_Z:
            case KeyCode.KEY_U:
                this.undo();
                break;
            case KeyCode.KEY_Y:
            case KeyCode.KEY_R:
                this.redo();
                break;
            default:
        }
    }

    handleToggleHighlightRestricted() {
        console.log('handleToggleHighlightRestricted');
        let newControl = this.state.control;
        newControl.toggleHighlightRestricted();
        this.setState({ control: newControl });
    }

    handleToggleHighlightMatchingNumbers() {
        console.log('handleToggleHighlightMatchingNumbers');
        let newControl = this.state.control;
        newControl.toggleHighlightMatchingNumbers();
        this.setState({ control: newControl });
    }

    handleToggleAutoCleanUp() {
        console.log('handleToggleAutoCleanUp');
        let newControl = this.state.control;
        newControl.toggleAutoCleanUp();
        this.setState({ control: newControl });
    }

    handleToggleAntiKnight() {
        console.log('handleToggleAntiKnight');
        let newControl = this.state.control;
        newControl.toggleAntiKnight();
        this.setState({ control: newControl });
    }

    handleToggleAntiKing() {
        console.log('handleToggleAntiKing');
        let newControl = this.state.control;
        newControl.toggleAntiKing();
        this.setState({ control: newControl });
    }

    handleClickFillCenter() {
        console.log('handleClickFillCenter');
        let newBoard = this.state.board;
        newBoard.fillAllPossibleValues(this.state.control.gamePlay);
        this.assignNewBoard(newBoard);
    }

    render() {
        return (
            <div
                onKeyDown={(e) => this.handleKeyDown(e)}
                tabIndex={0}
                className="container"
                onMouseUp={() => this.handleMouseUp()}
            >
                <h1>Sudoku Tool</h1>
                <div className="row">
                    <div className="col-sm">
                        <Board
                            board={this.state.board}
                            onClick={(e, i) => this.handleClick(e, i)}
                            onMouseDown={(e, i) => this.handleMouseDown(e, i)}
                            onMouseOver={(i) => this.handleMouseOver(i)}
                            highlightMatching={this.state.highlightMatching}
                        />
                    </div>
                    <div className="col-sm">
                        <Control
                            control={this.state.control}
                            onClickVerify={() => this.verifyBoard()}
                            onClickUndo={() => this.undo()}
                            onClickRedo={() => this.redo()}
                            onToggleHighlightRestricted={() => this.handleToggleHighlightRestricted()}
                            onToggleHighlightMatchingNumbers={() => this.handleToggleHighlightMatchingNumbers()}
                            onToggleAutoCleanUp={() => this.handleToggleAutoCleanUp()}
                            onToggleAntiKnight={() => this.handleToggleAntiKnight()}
                            onToggleAntiKing={() => this.handleToggleAntiKing()}
                            onClickFillCenters={() => this.handleClickFillCenter()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
