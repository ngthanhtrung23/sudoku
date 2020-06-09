import React from 'react';
import { CellModel, CellValue } from '../../models/cell';


type CellProps = {
    cell: CellModel,
    onClick: (e: any) => void,
    onMouseDown: (e: any) => void,
    onMouseOver: (e: any) => void,
    key: string,
    highlightMatching: CellValue,
};

class Cell extends React.Component<CellProps> {
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

    shouldHighlightMatching(value: CellValue) {
        return this.props.highlightMatching && value === this.props.highlightMatching;
    }

    renderCellCornerValues() {
        if (this.props.cell.value) {
            // Do not show corner values, if cell is filled.
            return;
        }
        const sortedValues = Array.from(this.props.cell.cornerValues)
            .sort()
            .map((value) => {
                const classes = this.shouldHighlightMatching(value) ? 'matching' : '';
                return (
                    <span
                        className={classes}
                        key={"corner-" + this.props.cell.id + "-" + value}
                    >
                        {value}
                    </span>
                );
            });
        return (
            <span className="cell-corner-value">
                {sortedValues}
            </span>
        );
    }

    renderCellCenterValues() {
        if (this.props.cell.value) {
            // Do not show center values, if cell is filled.
            return;
        }
        const sortedValues = Array.from(this.props.cell.centerValues)
            .sort()
            .map((value) => {
                const classes = this.shouldHighlightMatching(value) ? 'matching' : '';
                return (
                    <span
                        className={classes}
                        key={"center-" + this.props.cell.id + "-" + value}
                    >
                        {value}
                    </span>
                );
            });
        return (
            <span className="cell-center-value">
                {sortedValues}
            </span>
        );
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
        } else if (this.shouldHighlightMatching(this.props.cell.value)) {
            classes.push('matching');
        } else if (this.props.cell.restricted) {
            classes.push('restricted');
        } else if (this.props.cell.isFixed) {
            classes.push('fixed');
        }
        if (this.props.cell.error) {
            classes.push('error');
        }

        return (
            <div
                className={classes.join(' ')}
                onClick={this.props.onClick}
                onMouseDown={this.props.onMouseDown}
                onMouseOver={this.props.onMouseOver}
                key={this.props.cell.id}
            >
                {this.renderCellMainValue()}
                {this.renderCellCornerValues()}
                {this.renderCellCenterValues()}
            </div>
        );
    }
}

export default Cell;
