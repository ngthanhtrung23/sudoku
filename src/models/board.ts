import { CellModel, CellValue } from './cell';
import { GameOptions } from './control';

function set_intersection(a: Set<any>, b: Set<any>) {
    return new Set([...a].filter(x => b.has(x)));
}

function set_difference(a: Set<any>, b: Set<any>) {
    return new Set([...a].filter(x => !b.has(x)));
}

class BoardModel {
    cells: Array<CellModel>;
    highlightMatching: CellValue;
    multiSelectMode: boolean;

    constructor() {
        this.cells = [];
        for (let i = 0; i < 81; i++) {
            this.cells.push(new CellModel(i));
        }
        this.highlightMatching = null;
        this.multiSelectMode = false;
    }

    serialize(): string {
        let result: Array<{
            value: CellValue;
            cornerValues: Array<CellValue>;
            centerValues: Array<CellValue>;
        }> = [];

        this.cells.forEach((cell) => {
            result.push({
                value: cell.value,
                cornerValues: Array.from(cell.cornerValues),
                centerValues: Array.from(cell.centerValues),
            });
        });
        return JSON.stringify(result);
    }

    load(serialized: string): void {
        this.clearAllErrors();
        this.clearAllRestricteds();
        this.clearAllSelections();

        let obj = JSON.parse(serialized);
        for (let i = 0; i < 81; i++) {
            this.cells[i].value = obj[i].value;
            this.cells[i].cornerValues = new Set(obj[i].cornerValues);
            this.cells[i].centerValues = new Set(obj[i].centerValues);
        }
    }

    /** Check if a (row, col) is within the board. */
    isInside(row: number, col: number): boolean {
        return 0 <= row && row < 9 && 0 <= col && col < 9;
    }

    toCellId(row: number, col: number): number {
        return row * 9 + col;
    }

    toRowCol(cellId: number): [number, number] {
        return [~~(cellId / 9), cellId % 9];
    }

    getRegionByPosition(row: number, col: number): number {
        const r = ~~(row / 3);
        const c = ~~(col / 3);
        return r * 3 + c;
    }

    getRegion(cellId: number): number {
        const [row, col] = this.toRowCol(cellId);
        return this.getRegionByPosition(row, col);
    }

    /**
     * Return set of cells visible from a single cell, not including
     * that cell.
     */
    getVisibleCells(cellId: number, gamePlay: GameOptions): Set<number> {
        const [row, col] = this.toRowCol(cellId);

        let result: Set<number> = new Set();

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

        // Anti-knight
        if (gamePlay.antiKnight) {
            for (let di = -2; di <= 2; di++) {
                for (let dj = -2; dj <= 2; dj++) {
                    if (di*di + dj*dj === 5) {
                        const row2 = row + di;
                        const col2 = col + dj;
                        if (this.isInside(row2, col2)) {
                            result.add(this.toCellId(row2, col2));
                        }
                    }
                }
            }
        }

        // Anti-king
        if (gamePlay.antiKing) {
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    const row2 = row + di;
                    const col2 = col + dj;
                    if (this.isInside(row2, col2)) {
                        result.add(this.toCellId(row2, col2));
                    }
                }
            }
        }

        // Do not include the same cell.
        result.delete(cellId);
        return result;
    }

    getInvalidCellIds(gamePlay: GameOptions): Set<number> {
        let result: Set<number> = new Set();
        for (let i = 0; i < 81; i++) {
            const myValue = this.cells[i].value;
            if (myValue) {
                this.getVisibleCells(i, gamePlay).forEach(neighborId => {
                    if (myValue === this.cells[neighborId].value) {
                        result.add(i);
                        result.add(neighborId);
                    }
                })
            }
        }
        return result;
    }

    getPossibleValues(cellId: number, gamePlay: GameOptions): Set<CellValue> {
        const seenValues = Array.from(this.getVisibleCells(cellId, gamePlay))
            .map(neighborId => this.cells[neighborId].value)
            .filter(x => x);

        return set_difference(new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']), new Set(seenValues));
    }

    fillAllPossibleValues(gamePlay: GameOptions): void {
        this.cells.forEach(cell => {
            if (!cell.value) {
                cell.centerValues = this.getPossibleValues(cell.id, gamePlay);
            }
        });
    }

    setSelected(cellId: number): void {
        this.cells[cellId].selected = true;
    }

    getSelectedValues(): Set<CellValue> {
        return new Set(
            this.cells
                .filter((cell) => cell.selected)
                .filter((cell) => cell.value)
                .map((cell) => cell.value)
        );
    }

    setRestricted(gamePlay: GameOptions): void {
        let restricted: Set<any> | null = null;

        for (let id = 0; id < 81; id++) {
            if (this.cells[id].selected) {
                if (restricted === null) {
                    restricted = this.getVisibleCells(id, gamePlay);
                } else {
                    restricted = set_intersection(this.getVisibleCells(id, gamePlay), restricted);
                }
            }
        }

        if (restricted) {
            restricted.forEach((cellId) => {
                this.cells[cellId].restricted = true;
            });
        }
    }

    setErrors(cellIds: Set<number>): void {
        cellIds.forEach((id) => {
            this.cells[id].error = true;
        });
    }

    setValueOfSelectedCells(newValue: CellValue, gamePlay: GameOptions, autoCleanup: boolean = false): void {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                cell.value = newValue;
                if (autoCleanup) {
                    this.getVisibleCells(cell.id, gamePlay).forEach((id) => {
                        this.cells[id].cornerValues.delete(newValue);
                        this.cells[id].centerValues.delete(newValue);
                    });
                }
            }
        });
    }

    unsetSelectedCells(): void {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                cell.value = null;
            }
        });
    }

    toggleCornerValuesOfSelectedCells(value: CellValue): void {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                if (cell.cornerValues.has(value)) {
                    cell.cornerValues.delete(value);
                } else {
                    cell.cornerValues.add(value);
                }
            }
        });
    }

    clearCornerValuesOfSelectedCells(): void {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                cell.cornerValues.clear();
            }
        })
    }

    toggleCenterValuesOfSelectedCells(value: CellValue): void {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                if (cell.centerValues.has(value)) {
                    cell.centerValues.delete(value);
                } else {
                    cell.centerValues.add(value);
                }
            }
        });
    }

    clearCenterValuesOfSelectedCells(): void {
        this.cells.forEach((cell) => {
            if (cell.selected) {
                cell.centerValues.clear();
            }
        });
    }

    clearAllSelections(): void {
        this.cells.forEach((cell) => {
            cell.selected = false;
        });
    }

    clearAllRestricteds(): void {
        this.cells.forEach((cell) => {
            cell.restricted = false;
        });
    }

    clearAllErrors(): void {
        this.cells.forEach((cell) => {
            cell.error = false;
        });
    }
}

export { BoardModel };
