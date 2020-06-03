import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import * as KeyCode from 'keycode-js';

import { Board } from './board.js';
import { Control } from './control.js';
import BoardModel from './models/boardModel.js';
import ControlModel from './models/controlModel.js';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    assignNewBoard(board) {
        this.setState({
            board: board,
            control: this.state.control,
        })
    }

    clearSelectionAndRestricted() {
        console.log('clearSelectionAndRestricted');
        let newBoard = this.cloneBoard();

        newBoard.clearAllSelections();
        newBoard.clearAllRestricteds();

        this.assignNewBoard(newBoard);
    }

    // Select a cell.
    select(cellId) {
        console.log('select ' + cellId);
        let newBoard = this.cloneBoard();
        this.clearSelectionAndRestricted();

        newBoard.setSelected(cellId);
        newBoard.setRestricted(cellId);

        this.assignNewBoard(newBoard);
    }

    // Handle clicking on a cell.
    handleClick(cellId) {
        console.log('handleClick ' + cellId);
        this.select(cellId);
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

    clearAllError() {
        console.log('clearAllError');
        let newBoard = this.cloneBoard();
        newBoard.clearAllErrors();
        this.assignNewBoard(newBoard);
    }

    verifyBoard() {
        console.log('verifyBoard');
        let newBoard = this.cloneBoard();
        let invalidCellIds = newBoard.getInvalidCellIds();
        newBoard.setErrors(invalidCellIds);
        this.assignNewBoard(newBoard);

        alert(invalidCellIds.length > 0 ? 'Error found :(' : 'LGTM!');
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
            this.setValueToSelectedCells(String.fromCharCode(e.keyCode));
        }

        switch (e.keyCode) {
            case KeyCode.KEY_SPACE:
                this.unsetSelectedCells();
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
        }
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
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="col-sm">
                        <Control
                            onClickVerify={() => this.verifyBoard()}
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
