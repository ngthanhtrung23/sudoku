import React from 'react';
import ReactDOM from 'react-dom';
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
        let newGame = Object.assign({}, this.state);
        Object.setPrototypeOf(newGame, GameData.prototype);
        return newGame;
    }

    // Handle clicking on a cell.
    handleClick(cellId) {
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
        this.clearAllError();
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            if (newGame.board.cells[i].selected) {
                newGame.board.cells[i].value = newValue;
            }
        }
        this.setState(newGame);
    }

    clearAllError() {
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].error = false;
        }
        this.setState(newGame);
    }

    verifyBoard() {
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            const myValue = newGame.board.cells[i].value;
            if (myValue) {
                newGame.getVisibleCells(i).forEach((neighborId) => {
                    if (myValue === newGame.board.cells[neighborId].value) {
                        newGame.board.cells[i].error = true;
                        newGame.board.cells[neighborId].error = true;
                    }
                })
            }
        }
        this.setState(newGame);
    }

    // Handle keypress event on a cell.
    handleKeyDown(e) {
        console.log('keyCode = ' + e.keyCode);
        // Pressed 1-9
        if (e.keyCode >= 49 && e.keyCode <= 57) {
            this.fillSelectedWithValue(String.fromCharCode(e.keyCode));
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
