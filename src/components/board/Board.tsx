import React from 'react';
import { BoardModel } from '../../models/board';
import { GameOptions } from '../../models/control';
import Cell from './Cell';
import SandwichCell from './SandwichCell';


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

    renderSandwichCell(isRow: boolean, id: number, key: string) {
        const value = (isRow) ? this.props.board.rowSandwich[id] : this.props.board.colSandwich[id];
        return (
            <SandwichCell
                value={value}
                key={key}
                onClick={(e) => this.props.onSelectSandwich(e, isRow, id)}
            />
        );
    }
    
    renderEmptySandwichCell() {
        return (
            <div className="sandwich-cell"></div>
        );
    }

    renderRow(rowId: number) {
        const startingCell = rowId * 9;
        const cells = [...Array(9).keys()].map(x => this.renderCell(startingCell + x));

        let sandwichCell = null;
        if (this.props.gameOptions.sandwich) {
            sandwichCell = this.renderSandwichCell(
                true, rowId, `sandwich-row-${rowId}`);
        }

        return (
            <div className="row" key={startingCell}>
                {sandwichCell}
                {cells}
            </div>
        );
    }

    renderSandwichRow() {
        const sandwichCells = [...Array(9).keys()].map(
            x => this.renderSandwichCell(false, x, `sandwich-col-${x}`));

        return (
            <div className="row">
                {this.renderEmptySandwichCell()}
                {sandwichCells}
            </div>
        );
    }

    render() {
        let sandwichRow = null;
        if (this.props.gameOptions.sandwich) {
            sandwichRow = this.renderSandwichRow();
        }

        const rows = [...Array(9).keys()].map(x => this.renderRow(x));
        return (
            <div>
                {sandwichRow}
                {rows}
            </div>
        );
    }
}

type BoardProps = {
    board: BoardModel,
    gameOptions: GameOptions,
    onClick: (e: any, i: number) => void,
    onSelectSandwich: (e: any, isRow: boolean, i: number) => void,
    onMouseDown: (e: any, i: number) => void,
    onMouseOver: (i: number) => void,
};


export default Board;
