import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import * as KeyCode from 'keycode-js';

import Board from './board.js';
import Control from './control.js';
import BoardModel from './models/boardModel.js';
import ControlModel from './models/controlModel.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new BoardModel(),
            control: new ControlModel(),
        };
    }
    
    cloneBoard() {
        let newBoard = _.clone(this.state.board, true);
        return newBoard;
    }

    cloneControl() {
        let newControl = _.clone(this.state.control, true);
        return newControl;
    }

    assignNewBoard(board) {
        this.setState({
            board: board,
            control: this.state.control,
        })
    }

    assignNewControl(control) {
        this.setState({
            board: this.state.board,
            control: control,
        });
    }

    clearSelectionAndRestricted() {
        console.log('clearSelectionAndRestricted');
        let newBoard = this.cloneBoard();

        newBoard.clearAllSelections();
        newBoard.clearAllRestricteds();

        this.assignNewBoard(newBoard);
    }

    // Select a cell.
    select(cellId, clearSelection = true) {
        console.log('select ' + cellId);
        let newBoard = this.cloneBoard();
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
    }

    // Handle clicking on a cell.
    handleClick(e, cellId) {
        console.log('handleClick ' + cellId);
        this.select(cellId, !e.metaKey);
    }

    setValueToSelectedCells(newValue) {
        console.log('setValueToSelectedCells ' + newValue);
        this.clearAllError();

        let newBoard = this.cloneBoard();
        newBoard.setValueToSelectedCells(newValue);

        this.assignNewBoard(newBoard);
    }

    unsetSelectedCells() {
        console.log('unsetSelectedCells');
        this.clearAllError();

        let newBoard = this.cloneBoard();
        newBoard.unsetSelectedCells();

        this.assignNewBoard(newBoard);
    }

    toggleCornerValuesToSelectedCells(newValue) {
        console.log('toggleCornerValuesToSelectedCells ' + newValue);

        let newBoard = this.cloneBoard();
        newBoard.toggleCornerValuesToSelectedCells(newValue);

        this.assignNewBoard(newBoard);
    }

    clearCornerValuesOfSelectedCells() {
        console.log('clearCornerValuesOfSelectedCells');
        
        let newBoard = this.cloneBoard();
        newBoard.clearCornerValuesOfSelectedCells();
        this.assignNewBoard(newBoard);
    }

    clearAllError() {
        console.log('clearAllError');
        let newBoard = this.cloneBoard();
        newBoard.clearAllErrors();
        this.assignNewBoard(newBoard);
    }

    verifyBoard() {
        console.log('verifyBoard');
        let newBoard = this.cloneBoard();
        newBoard.clearAllErrors();
        let invalidCellIds = newBoard.getInvalidCellIds(this.state.control.gamePlay);
        newBoard.setErrors(invalidCellIds);
        this.assignNewBoard(newBoard);

        alert(invalidCellIds.size > 0 ? 'Error found :(' : 'LGTM!');
    }

    // Move selected cell in direction (d_row, d_col).
    // If there are more than one selected cells, only move the first one.
    moveSelection(d_row, d_col) {
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
    handleKeyDown(e) {
        console.log('handleKeyDown, keyCode = ' + e.keyCode);

        let isShift = !!e.shiftKey;

        // Pressed 1-9
        if (e.keyCode >= KeyCode.KEY_1 && e.keyCode <= KeyCode.KEY_9) {
            const value = String.fromCharCode(e.keyCode);
            if (isShift) {
                this.toggleCornerValuesToSelectedCells(value)
            } else {
                this.setValueToSelectedCells(value);
            }
        }

        switch (e.keyCode) {
            case KeyCode.KEY_SPACE:
                this.unsetSelectedCells();
                break;
            case KeyCode.KEY_BACK_SPACE:
                this.unsetSelectedCells();
                this.clearCornerValuesOfSelectedCells();
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
            default:
        }
    }

    handleToggleHighlightRestricted() {
        console.log('handleToggleHighlightRestricted');
        let newControl = this.cloneControl();
        newControl.toggleHighlightRestricted();
        this.assignNewControl(newControl);
    }

    handleToggleAntiKnight() {
        console.log('handleToggleAntiKnight');
        let newControl = this.cloneControl();
        newControl.toggleAntiKnight();
        this.assignNewControl(newControl);
    }

    handleToggleAntiKing() {
        console.log('handleToggleAntiKing');
        let newControl = this.cloneControl();
        newControl.toggleAntiKing();
        this.assignNewControl(newControl);
    }

    render() {
        return (
            <div
                onKeyDown={(e) => this.handleKeyDown(e)}
                tabIndex="0"
                className="container"
            >
                <h1>Sudoku Tool</h1>
                <div className="row">
                    <div className="col-sm">
                        <Board
                            board={this.state.board}
                            onClick={(e, i) => this.handleClick(e, i)}
                        />
                    </div>
                    <div className="col-sm">
                        <Control
                            control={this.state.control}
                            onClickVerify={() => this.verifyBoard()}
                            onToggleHighlightRestricted={() => this.handleToggleHighlightRestricted()}
                            onToggleAntiKnight={() => this.handleToggleAntiKnight()}
                            onToggleAntiKing={() => this.handleToggleAntiKing()}
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
