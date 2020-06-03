class CellData {
    constructor(_row, _col) {
        this.value = null;
        this.cornerValues = new Set();
        this.centerValues = new Set();

        this.row = _row;
        this.col = _col;
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
            this.cells.push(new CellData(~~(i / 9), i % 9));
        }
    }
}

class GameData {
    constructor() {
        this.board = new BoardData();
    }
}

export { CellData, BoardData, GameData };
