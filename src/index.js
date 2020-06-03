import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { Board } from './board.js';
import { Control } from './control.js';
import { GameData } from './data.js';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GameData();
    }
    
    cloneState() {
        let newGame = _.clone(this.state, true);
        Object.setPrototypeOf(newGame, GameData.prototype);
        return newGame;
    }

    // Handle clicking on a cell.
    handleClick(cellId) {
        console.log('handleClick ' + cellId);
        // Clear all highlighting in the board.
        let newGame = this.cloneState();

        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].selected = false;
        }

        // Select new cell.
        newGame.board.cells[cellId].selected = true;

        // Clear all previously restricted cells.
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].restricted = false;
        }

        // Update restricted cells.
        newGame.getVisibleCells(cellId).forEach((id) => {
            newGame.board.cells[id].restricted = true;
        });

        this.setState(newGame);
    }

    fillSelectedWithValue(newValue) {
        console.log('fillSelectedWithValue ' + newValue);
        this.clearAllError();
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            if (newGame.board.cells[i].selected) {
                newGame.board.cells[i].value = newValue;
            }
        }
        this.setState(newGame);
    }

    unfillSelected() {
        console.log('unfillSelected');
        this.clearAllError();
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            if (newGame.board.cells[i].selected) {
                newGame.board.cells[i].value = null;
            }
        }
        this.setState(newGame);
    }

    clearAllError() {
        console.log('clearAllError');
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].error = false;
        }
        console.log(newGame);
        this.setState(newGame);
    }

    verifyBoard() {
        console.log('verifyBoard');
        let newGame = this.cloneState();
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
        this.setState(newGame);

        alert(hasError ? 'Error found :(' : 'LGTM!');
    }

    // Handle keypress event on a cell.
    handleKeyDown(e) {
        console.log('handleKeyDown, keyCode = ' + e.keyCode);
        // Pressed 1-9
        if (e.keyCode >= 49 && e.keyCode <= 57) {
            this.fillSelectedWithValue(String.fromCharCode(e.keyCode));
        }
        // Press space
        if (e.keyCode === 32) {
            this.unfillSelected();
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
