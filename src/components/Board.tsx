import React from 'react';

import { BoardModel } from '../models/boardModel';
import { CellValue } from '../models/cellModel';
import Cell from './Cell';

type BoardProps = {
    board: BoardModel,
    onClick: (e: any, i: number) => void,
    onMouseDown: (e: any, i: number) => void,
    onMouseOver: (i: number) => void,
    highlightMatching: CellValue,
};

class Board extends React.Component<BoardProps> {
    renderCell(i: number) {
        return (
            <Cell
                cell={this.props.board.cells[i]}
                onClick={(e) => this.props.onClick(e, i)}
                onMouseDown={(e) => this.props.onMouseDown(e, i)}
                onMouseOver={() => this.props.onMouseOver(i)}
                key={String(i)}
                highlightMatching={this.props.highlightMatching}
            />
        );
    }

    renderRow(startingCell: number) {
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

export default Board;
