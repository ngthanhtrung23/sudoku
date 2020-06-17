import { set_difference, set_intersection } from '../utils/set';
import { CellModel, CellValue } from './cell';
import { GameOptions } from './control';
import { SandwichCellModel } from './sandwichCell';

type SerializedCell = {
    value: CellValue;
    fixed: boolean | null;
    color: number | null;
    cornerValues: Array<CellValue>;
    centerValues: Array<CellValue>;
};
type SerializedSandwich = {
    value: number | null;
    fixed: boolean;
};
type Serialized = {
    cells: Array<SerializedCell>;
    rowSandwiches: Array<SerializedSandwich>;
    colSandwiches: Array<SerializedSandwich>;
};

class BoardModel {
    cells: Array<CellModel>;
    highlightMatching: CellValue;
    multiSelectMode: boolean;

    // For sandwich sudoku
    // For each row and column, we may be given the sum of cells between the cells containing 1 and 9.
    rowSandwich: Array<SandwichCellModel>;
    colSandwich: Array<SandwichCellModel>;

    constructor() {
        this.cells = [];
        for (let i = 0; i < 81; i++) {
            this.cells.push(new CellModel(i));
        }
        this.highlightMatching = null;
        this.multiSelectMode = false;

        this.rowSandwich = [];
        this.colSandwich = [];
        for (let i = 0; i < 9; i++) {
            this.rowSandwich.push(new SandwichCellModel(`row-${i}`));
            this.colSandwich.push(new SandwichCellModel(`col-${i}`));
        }
    }

    // Used for maintaining board history.
    serialize(): string {
        let result: Array<SerializedCell> = [];

        this.cells.forEach((cell) => {
            result.push({
                value: cell.value,
                fixed: cell.isFixed,
                color: cell.color,
                cornerValues: Array.from(cell.cornerValues),
                centerValues: Array.from(cell.centerValues),
            });
        });
        let obj: Serialized = {
            cells: result,
            rowSandwiches: this.rowSandwich.map(cell => { return { value: cell.value, fixed: cell.isFixed }; }),
            colSandwiches: this.colSandwich.map(cell => { return { value: cell.value, fixed: cell.isFixed }; }),
        };
        return JSON.stringify(obj);
    }

    // Used for maintaining board history.
    load(serialized: string): void {
        this.clearAllErrors();
        this.clearAllRestricteds();
        this.clearAllSelections();

        const deserialized = JSON.parse(serialized) as Serialized;
        const cells = deserialized.cells;
        for (let i = 0; i < 81; i++) {
            this.cells[i].value = cells[i].value;
            this.cells[i].isFixed = cells[i].fixed;
            this.cells[i].color = cells[i].color;
            this.cells[i].cornerValues = new Set(cells[i].cornerValues);
            this.cells[i].centerValues = new Set(cells[i].centerValues);
        }

        for (let i = 0; i < 9; i++) {
            this.rowSandwich[i].value = deserialized.rowSandwiches[i].value;
            this.rowSandwich[i].isFixed = deserialized.rowSandwiches[i].fixed;

            this.colSandwich[i].value = deserialized.colSandwiches[i].value;
            this.colSandwich[i].isFixed = deserialized.colSandwiches[i].fixed;
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
    getVisibleCells(cellId: number, gameOptions: GameOptions): Set<number> {
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
        if (gameOptions.antiKnight) {
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
        if (gameOptions.antiKing) {
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

    getInvalidCellIds(gameOptions: GameOptions): Set<number> {
        let result: Set<number> = new Set();
        for (let i = 0; i < 81; i++) {
            const myValue = this.cells[i].value;
            if (myValue) {
                this.getVisibleCells(i, gameOptions).forEach(neighborId => {
                    if (myValue === this.cells[neighborId].value) {
                        result.add(i);
                        result.add(neighborId);
                    }
                })
            }
        }
        return result;
    }

    getPossibleValues(cellId: number, gameOptions: GameOptions): Set<CellValue> {
        const seenValues = Array.from(this.getVisibleCells(cellId, gameOptions))
            .map(neighborId => this.cells[neighborId].value)
            .filter(x => x);

        return set_difference(new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']), new Set(seenValues));
    }

    fillAllPossibleValues(gameOptions: GameOptions): void {
        this.cells.forEach(cell => {
            if (!cell.value) {
                cell.centerValues = this.getPossibleValues(cell.id, gameOptions);
            }
        });
    }

    hasSelected(): boolean {
        return this.cells.find(cell => cell.selected) !== undefined;
    }

    hasSandwichSelected(): boolean {
        return this.rowSandwich.find(cell => cell.selected) !== undefined
            || this.colSandwich.find(cell => cell.selected) !== undefined;
    }

    getSandwichSum(values: Array<CellValue>): number | null {
        if (values.indexOf('1') < 0 || values.indexOf('9') < 0) {
            return null;
        }
        const left = Math.min(values.indexOf('1'), values.indexOf('9'));
        const right = Math.max(values.indexOf('1'), values.indexOf('9'));

        let sum = 0;
        for (let value of values.slice(left + 1, right)) {
            if (value === null) {
                return null;
            }
            sum += +value;
        }
        return sum;
    }

    getRowValues(rowId: number): Array<CellValue> {
        return this.cells.slice(rowId * 9, rowId * 9 + 9).map(cell => cell.value);
    }

    getColValues(colId: number): Array<CellValue> {
        return this.cells.filter(cell => cell.id % 9 === colId).map(cell => cell.value);
    }

    getRowSandwichSum(rowId: number): number | null {
        return this.getSandwichSum(this.getRowValues(rowId));
    }

    getColSandwichSum(colId: number): number | null {
        return this.getSandwichSum(this.getColValues(colId));
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

    setRestricted(gameOptions: GameOptions): void {
        let restricted: Set<any> | null = null;

        for (let id = 0; id < 81; id++) {
            if (this.cells[id].selected) {
                if (restricted === null) {
                    restricted = this.getVisibleCells(id, gameOptions);
                } else {
                    restricted = set_intersection(this.getVisibleCells(id, gameOptions), restricted);
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

    setValueOfSingleCell(cellId: number, newValue: CellValue, gameOptions: GameOptions, autoCleanup: boolean): void {
        if (this.cells[cellId].isFixed) {
            return;
        }
        this.cells[cellId].value = newValue;
        if (autoCleanup) {
            this.getVisibleCells(this.cells[cellId].id, gameOptions).forEach((id) => {
                this.cells[id].cornerValues.delete(newValue);
                this.cells[id].centerValues.delete(newValue);
            });
        }
    }

    setValueOfSelectedCells(newValue: CellValue, gameOptions: GameOptions, autoCleanup: boolean = false): void {
        this.cells
            .filter(cell => cell.selected)
            .forEach(cell => this.setValueOfSingleCell(cell.id, newValue, gameOptions, autoCleanup));
    }

    colorSelectedCells(color: number): void {
        this.cells
            .filter(cell => cell.selected)
            .forEach(cell => cell.color = color);
    }

    clearAllColors(): void {
        this.cells.forEach(cell => cell.color = null);
    }

    unsetSelectedCells(): void {
        this.cells
            .filter(cell => cell.selected && !cell.isFixed)
            .forEach(cell => { cell.value = null });
        
        [...this.rowSandwich, ...this.colSandwich]
            .filter(cell => cell.selected && !cell.isFixed)
            .forEach(cell => { cell.value = null });
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
        this.rowSandwich.forEach((cell) => {
            cell.selected = false;
        });
        this.colSandwich.forEach((cell) => {
            cell.selected = false;
        });
    }

    clearAllRestricteds(): void {
        this.cells.forEach((cell) => {
            cell.restricted = false;
        });
    }

    clearAllErrors(): void {
        this.cells.forEach(cell => { cell.error = false });
        this.rowSandwich.forEach(cell => { cell.error = false });
        this.colSandwich.forEach(cell => { cell.error = false });
    }
}

export { BoardModel };
