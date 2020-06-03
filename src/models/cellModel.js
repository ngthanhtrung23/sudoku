class CellModel {
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

export default CellModel;
