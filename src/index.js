import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import * as KeyCode from 'keycode-js';

import { Board } from './board.js';
import { Control } from './control.js';
import { ControlData, GameData } from './data.js';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new GameData(),
            control: new ControlData(),
        };
    }
    
    cloneGame() {
        let newGame = _.clone(this.state.game, true);
        return newGame;
    }

    assignNewGame(game) {
        this.setState({
            game: game,
            control: this.state.control,
        })
    }

    clearSelectionAndRestricted() {
        console.log('clearSelectionAndRestricted');
        let newGame = this.cloneGame();

        // Clear all highlighting in the board.
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].selected = false;
        }

        // Clear all previously restricted cells.
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].restricted = false;
        }

        this.assignNewGame(newGame);
    }

    // Select a cell.
    select(cellId) {
        console.log('select ' + cellId);
        let newGame = this.cloneGame();
        this.clearSelectionAndRestricted();

        // Select new cell.
        newGame.board.cells[cellId].selected = true;

        // Update restricted cells.
        newGame.getVisibleCells(cellId).forEach((id) => {
            newGame.board.cells[id].restricted = true;
        });

        this.assignNewGame(newGame);
    }

    // Handle clicking on a cell.
    handleClick(cellId) {
        console.log('handleClick ' + cellId);
        this.select(cellId);
    }

    fillSelectedWithValue(newValue) {
        console.log('fillSelectedWithValue ' + newValue);
        this.clearAllError();
        let newGame = this.cloneGame();
        for (let i = 0; i < 81; i++) {
            if (newGame.board.cells[i].selected) {
                newGame.board.cells[i].value = newValue;
            }
        }
        this.assignNewGame(newGame);
    }

    unfillSelected() {
        console.log('unfillSelected');
        this.clearAllError();
        let newGame = this.cloneGame();
        for (let i = 0; i < 81; i++) {
            if (newGame.board.cells[i].selected) {
                newGame.board.cells[i].value = null;
            }
        }
        this.assignNewGame(newGame);
    }

    clearAllError() {
        console.log('clearAllError');
        let newGame = this.cloneGame();
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].error = false;
        }
        this.assignNewGame(newGame);
    }

    verifyBoard() {
        console.log('verifyBoard');
        let newGame = this.cloneGame();
        let hasError = false;
        for (let i = 0; i < 81; i++) {
            const myValue = newGame.board.cells[i].value;
            if (myValue) {
                newGame.getVisibleCells(i).forEach((neighborId) => {
                    if (myValue === newGame.board.cells[neighborId].value) {
                        newGame.board.cells[i].error = true;
                        newGame.board.cells[neighborId].error = true;
                        hasError = true;
                    }
                })
            }
        }
        this.assignNewGame(newGame);

        alert(hasError ? 'Error found :(' : 'LGTM!');
    }

    // Move selected cell in direction (d_row, d_col).
    // If there are more than one selected cells, only move the first one.
    moveSelection(d_row, d_col) {
        let r = 0, c = 0;  // by default, assume that we selected (0, 0).
        for (let i = 0; i < 81; i++) {
            if (this.state.game.board.cells[i].selected) {
                console.log(this.state);
                [r, c] = this.state.game.toRowCol(i);
                break;
            }
        }
        r = (r + d_row + 9) % 9;
        c = (c + d_col + 9) % 9;
        this.select(this.state.game.toCellId(r, c));
    }

    // Handle keypress event on a cell.
    handleKeyDown(e) {
        console.log('handleKeyDown, keyCode = ' + e.keyCode);

        let isShift = !!e.shiftKey;

        // Pressed 1-9
        if (e.keyCode >= KeyCode.KEY_1 && e.keyCode <= KeyCode.KEY_9) {
            this.fillSelectedWithValue(String.fromCharCode(e.keyCode));
        }

        switch (e.keyCode) {
            case KeyCode.KEY_SPACE:
                this.unfillSelected();
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
                            board={this.state.game.board}
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
