import React from 'react';

import Cell from './Cell';
import { CellValue } from '../../models/cell';
import { BoardModel } from '../../models/board';

class Board extends React.Component<BoardProps> {
    renderCell(i: number) {
        return (
            <Cell
                cell={this.props.board.cells[i]}
                onClick={(e) => this.props.onClick(e, i)}
                onMouseDown={(e) => this.props.onMouseDown(e, i)}
                onMouseOver={() => this.props.onMouseOver(i)}
                key={String(i)}
                highlightMatching={this.props.board.highlightMatching}
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

type BoardProps = {
    board: BoardModel,
    onClick: (e: any, i: number) => void,
    onMouseDown: (e: any, i: number) => void,
    onMouseOver: (i: number) => void,
};


export default Board;
