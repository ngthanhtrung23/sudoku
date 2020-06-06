import React from 'react';

import Cell from './Cell';
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
        const cells = [...Array(9).keys()].map(x => this.renderCell(startingCell + x));
        return (
            <div className="row" key={startingCell}>
                {cells}
            </div>
        );
    }

    render() {
        const rows = [...Array(9).keys()].map(x => this.renderRow(9 * x));
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
