type CellValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | null;

class CellModel {
    value: CellValue;
    cornerValues: Set<CellValue>;
    centerValues: Set<CellValue>;
    selected: boolean;
    restricted: boolean;
    error: boolean;
    row: number;
    col: number;
    id: number;

    constructor(id: number) {
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

    isRegionTop(): boolean {
        return this.row % 3 === 0;
    }
    isRegionBottom(): boolean {
        return this.row % 3 === 2;
    }
    isRegionLeft(): boolean {
        return this.col % 3 === 0;
    }
    isRegionRight(): boolean {
        return this.col % 3 === 2;
    }

    isBoardTop(): boolean {
        return this.row === 0;
    }
    isBoardBottom(): boolean {
        return this.row === 8;
    }
    isBoardLeft(): boolean {
        return this.col === 0;
    }
    isBoardRight(): boolean {
        return this.col === 8;
    }
}

export { CellModel };
export type { CellValue };
