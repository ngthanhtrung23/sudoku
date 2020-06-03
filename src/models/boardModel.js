import CellModel from './cellModel.js';

class BoardModel {
    constructor() {
        this.cells = [];
        for (let i = 0; i < 81; i++) {
            this.cells.push(new CellModel(i));
        }
    }

    /** Check if a (row, col) is within the board. */
    isInside(row, col) {
        return 0 <= row && row < 9 && 0 <= col && col < 9;
    }

    toCellId(row, col) {
        return row * 9 + col;
    }

    toRowCol(cellId) {
        return [~~(cellId / 9), cellId % 9];
    }

    getRegionByPosition(row, col) {
        const r = ~~(row / 3);
        const c = ~~(col / 3);
        return r * 3 + c;
    }

    getRegion(cellId) {
        const [row, col] = this.toRowCol(cellId);
        return this.getRegionByPosition(row, col);
    }

    /**
     * Return set of cells visible from a single cell, not including
     * that cell.
     */
    getVisibleCells(cellId) {
        const [row, col] = this.toRowCol(cellId);

        let result = new Set();

        // Same row
        for (let col2 = 0; col2 < 9; col2++) {
            result.add(this.toCellId(row, col2));
        }
        // Same colum
        for (let row2 = 0; row2 < 9; row2++) {
            result.add(this.toCellId(row2, col));
        }
        // Same region
        const region = this.getRegion(cellId);
        for (let i = 0; i < 81; i++) {
            if (this.getRegion(i) === region) {
                result.add(i);
            }
        }

        // Do not include the same cell.
        result.delete(cellId);
        return result;
    }

    getInvalidCellIds() {
        let result = new Set();
        for (let i = 0; i < 81; i++) {
            const myValue = this.cells[i].value;
            if (myValue) {
                this.getVisibleCells(i).forEach((neighborId) => {
                    if (myValue === this.cells[neighborId].value) {
                        result.add(i);
                        result.add(neighborId);
                    }
                })
            }
        }
        return result;
    }

    setSelected(cellId) {
        this.cells[cellId].selected = true;
    }

    setRestricted(cellId) {
        this.getVisibleCells(cellId).forEach((neighborId) => {
            this.cells[neighborId].restricted = true;
        });
    }

    setErrors(cellIds) {
        cellIds.forEach((id) => {
            this.cells[id].error = true;
        });
    }

    setValueToSelectedCells(newValue) {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                cell.value = newValue;
            }
        });
    }

    unsetSelectedCells() {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                cell.value = null;
            }
        });
    }

    clearAllSelections() {
        this.cells.forEach((cell) => {
            cell.selected = false;
        });
    }

    clearAllRestricteds() {
        this.cells.forEach((cell) => {
            cell.restricted = false;
        });
    }

    clearAllErrors() {
        this.cells.forEach((cell) => {
            cell.error = false;
        });
    }
}

export default BoardModel;
