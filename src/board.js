import React from 'react';

class Cell extends React.Component {
    renderCellMainValue() {
        if (this.props.cell.value) {
            return (
                <span className="cell-main-value">
                    {this.props.cell.value}
                </span>
            );
        }
        return;
    }

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
        if (this.props.cell.restricted) {
            classes.push('restricted');
        }
        if (this.props.cell.error) {
            classes.push('error');
        }

        return (
            <div
                className={classes.join(' ')}
                onClick={this.props.onClick}
                key={this.props.cell.id}
            >
                {this.renderCellMainValue()}
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

export { Board };