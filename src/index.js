import React from 'react';
import ReactDOM from 'react-dom';
import './data.js';
import './index.css';
import { GameData } from './data.js';

class Cell extends React.Component {
    render() {
        let classes = ['cell'];

        // Add border based on region position.
        if (this.props.cell.isRegionTop()) {
            classes.push('region-top');
        }
        if (this.props.cell.isRegionLeft()) {
            classes.push('region-left');
        }

        // Add border based on board position.
        if (this.props.cell.isBoardLeft()) {
            classes.push('board-left');
        }
        if (this.props.cell.isBoardRight()) {
            classes.push('board-right');
        }
        if (this.props.cell.isBoardTop()) {
            classes.push('board-top');
        }
        if (this.props.cell.isBoardBottom()) {
            classes.push('board-bottom');
        }

        // Add highlighting class.
        if (this.props.cell.selected) {
            classes.push('selected');
        }

        return (
            <div
                className={classes.join(' ')}
                onClick={this.props.onClick}
                key={this.props.cell.id}
            >
            </div>
        );
    }
}

class Board extends React.Component {
    renderCell(i) {
        return (
            <Cell
                cell={this.props.board.cells[i]}
                onClick={() => this.props.onClick(i)}
                key={i}
            />
        );
    }

    renderRow(startingCell) {
        let cells = [];
        for (let i = startingCell; i < startingCell + 9; i++) {
            cells.push(this.renderCell(i));
        }
        return (
            <div className="row" key={startingCell}>
                {cells}
            </div>
        );
    }

    render() {
        let rows = [];
        for (let i = 0; i < 81; i += 9) {
            rows.push(this.renderRow(i));
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GameData();
    }

    // Handle clicking on a cell.
    handleClick(cellId) {
        console.log(cellId);

        // Clear all highlighting in the board.
        let newGame = this.state;
        for (let i = 0; i < 81; i++) {
            newGame.board.cells[i].selected = false;
        }

        // Select new cell.
        newGame.board.cells[cellId].selected = true;

        this.setState(newGame);
    }

    render() {
        return (
            <div>
                <h1>Sudoku Tool</h1>
                <Board
                    board={this.state.board}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
