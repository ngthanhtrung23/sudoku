import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './board.js';
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

        // Clear restricted cells.
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].restricted = false;
        }
        
        // Restrict visible cells.
        const visibles = newGame.getVisibleCells(cellId);
        visibles.forEach((id) => {
            newGame.board.cells[id].restricted = true;
        });

        this.setState(newGame);
    }

    fillSelectedWithValue(newValue) {
        let newGame = this.cloneState();
        for (let i = 0; i < 81; i++) {
            if (newGame.board.cells[i].selected) {
                newGame.board.cells[i].value = newValue;
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
