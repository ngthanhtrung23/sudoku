class CellData {
    constructor(id) {
        this.value = null;
        this.cornerValues = new Set();
        this.centerValues = new Set();
        this.selected = false;
        this.restricted = false;
        this.error = false;

        this.row = ~~(id / 9);
        this.col = id % 9;
        this.id = id;
    }

    isRegionTop() {
        return this.row % 3 === 0;
    }
    isRegionBottom() {
        return this.row % 3 === 2;
    }
    isRegionLeft() {
        return this.col % 3 === 0;
    }
    isRegionRight() {
        return this.col % 3 === 2;
    }

    isBoardTop() {
        return this.row === 0;
    }
    isBoardBottom() {
        return this.row === 8;
    }
    isBoardLeft() {
        return this.col === 0;
    }
    isBoardRight() {
        return this.col === 8;
    }
}

class BoardData {
    constructor() {
        this.cells = [];
        for (let i = 0; i < 81; i++) {
            this.cells.push(new CellData(i));
        }
    }
}

class ControlData {
    constructor() {
        this.highlightRestricted = true;
    }
}

class GameData {
    constructor() {
        this.board = new BoardData();
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

    /** Return set of cells visible from a single cell, not including that cell. */
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
}

export { CellData, BoardData, GameData, ControlData };
