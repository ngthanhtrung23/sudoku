import React from 'react';
import ReactDOM from 'react-dom';
import './data.js';
import './index.css';
import { GameData } from './data.js';

class Cell extends React.Component {
    render() {
        let classes = ['cell'];

        if (this.props.cell.isRegionTop()) {
            classes.push('region-top');
        }
        if (this.props.cell.isRegionLeft()) {
            classes.push('region-left');
        }

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

        return (
            <div class={classes.join(' ')}></div>
        );
    }
}

class Board extends React.Component {
    renderCell(i) {
        return (
            <Cell
                cell={this.props.board.cells[i]}
            />
        );
    }

    renderRow(startingCell) {
        let cells = [];
        for (let i = startingCell; i < startingCell + 9; i++) {
            cells.push(this.renderCell(i));
        }
        return (
            <div class="row">
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

    render() {
        return (
            <div>
                <h1>Sudoku Tool</h1>
                <Board board={this.state.board} />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
