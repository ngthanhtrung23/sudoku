import SortedSet from 'collections/sorted-set';
import _ from 'lodash';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';
import { bitContains, bitCount } from './bits';
import { sandwichLengths, sumToSeqs } from './sandwich';

const toRowId = (cellId: number) => {
    return ~~(cellId / 9);
};
const toColId = (cellId: number) => {
    return cellId % 9;
};
const toCellId = (rowId: number, colId: number) => {
    return rowId * 9 + colId;
};

const getRowValues = (rowId: number, values: Array<number>): Array<number> => {
    return values.slice(rowId * 9, rowId * 9 + 9);
}

const getColValues = (colId: number, values: Array<number>): Array<number> => {
    let res = [];
    for (let i = colId; i < 81; i += 9) {
        res.push(values[i]);
    }
    return res;
}

const equals = (a: [number, number], b: [number, number]): boolean => {
    return a[0] === b[0] && a[1] === b[1];
};
const compare = (a: [number, number], b: [number, number]): number => {
    if (a[0] !== b[0]) {
        return a[0] - b[0];
    }
    return a[1] - b[1];
}

class CandidateStore {
    candidates: Array<number>;
    set: SortedSet<[number, number]>;

    constructor(_candidates: Array<number>) {
        this.candidates = _candidates.map(candidate => (candidate <= 0 ? -1 : candidate));
        this.set = new SortedSet(
            [],
            equals,
            compare
        );

        for (let i = 0; i < 81; i++) {
            if (_candidates[i] > 0) {
                this.set.add([bitCount(_candidates[i]), i]);
            }
        }
    }

    hasCandidate(cellId: number, candidate: number): boolean {
        if (this.candidates[cellId] < 0) return false;
        return bitContains(this.candidates[cellId], candidate);
    }

    getCandidates(cellId: number): Array<number> {
        if (this.candidates[cellId] < 0) {
            return [];
        }

        let res = [];
        for (let i = 1; i <= 9; i++) {
            if (this.hasCandidate(cellId, i)) {
                res.push(i);
            }
        }
        return res;
    }

    getBestCell(): [number, number] {
        let minNode = this.set.min();
        if (minNode) {
            return minNode;
        }
        return [-1, -1];
    }

    setCandidate(cellId: number, newValue: number) {
        if (this.candidates[cellId] < 0) return;

        this.set.remove([bitCount(this.candidates[cellId]), cellId]);
        this.candidates[cellId] = newValue;
        this.set.add([bitCount(newValue), cellId]);
    }

    addCandidate(cellId: number, candidate: number) {
        if (this.candidates[cellId] < 0) return;
        if (bitContains(this.candidates[cellId], candidate)) {
            return;
        }
        this.setCandidate(cellId, this.candidates[cellId] + (1 << candidate));
    }

    removeCandidate(cellId: number, candidate: number) {
        if (this.candidates[cellId] < 0) return;
        if (!bitContains(this.candidates[cellId], candidate)) {
            return;
        }
        this.setCandidate(cellId, this.candidates[cellId] - (1 << candidate));
    }

    removeCell(cellId: number) {
        if (this.candidates[cellId] < 0) return;

        this.set.remove([bitCount(this.candidates[cellId]), cellId]);
        this.candidates[cellId] = -1;
    }
};

// Input:
// - sum = sandwich sum for this row / column.
// - values = numbers in this row / column. If missing --> 0.
//
// Return:
// - Set of possible values inside sandwich,
// - Set of possible values outside sandwich.
const getValidSandwichValues = (sum: number, values: Array<number>): [Set<number>, Set<number>] => {
    if (sum === 0) {
        return [new Set(), new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])];
    }

    let left = values.indexOf(1);
    let right = values.indexOf(9);
    if (left > right) {
        [left, right] = [right, left];
    }
    const len = right - left - 1;

    // What we know about the seqs
    let mustHave: Set<number> = new Set();
    let mustNot: Set<number> = new Set();
    let inside = false;
    for (let value of values) {
        if (value === 0) continue;

        if (value === 1 || value === 9) {
            inside = !inside;
        } else {
            if (inside) mustHave.add(value);
            else mustNot.add(value);
        }
    }

    // Check all seqs with this sum.
    let insides: Set<number> = new Set();
    let outsides: Set<number> = new Set();
    for (let seq of sumToSeqs[sum]) {
        const seq_set = new Set(seq);
        let can = true;
        if (seq.length !== len) {
            can = false;
        }
        for (let value of mustHave) {
            if (!seq_set.has(value)) {
                can = false;
                break;
            }
        }
        for (let value of mustNot) {
            if (seq_set.has(value)) {
                can = false;
                break;
            }
        }
        if (can) {
            for (let value = 1; value <= 9; value++) {
                if (seq_set.has(value)) {
                    insides.add(value);
                } else {
                    outsides.add(value);
                }
            }
        }
    }
    return [insides, outsides];
}

// Assumption: we have just filled number in cell (rowId, colId).
// We want to use sandwich clue in that row / column to eliminiate some candidates.
const applySandwichClues = (
        board: BoardModel,
        rowId: number,
        colId: number,
        values: Array<number>,
        candidateStore: CandidateStore
        ): void => {
    // For row.
    if (board.rowSandwich[rowId].value !== null) {
        const row = getRowValues(rowId, values);
        const sandwichSum: number = board.rowSandwich[rowId].value as number;

        if (row.indexOf(1) >= 0 && row.indexOf(9) >= 0) {
            const [insides, outsides] = getValidSandwichValues(sandwichSum, row);
            let inside = false;
            for (let i = 0; i < 9; i++) {
                if (row[i] === 1 || row[i] === 9) {
                    inside = !inside;
                } else if (row[i] === 0) {
                    for (let value = 1; value <= 9; value++) {
                        const cellId = toCellId(rowId, i);
                        if ((inside && !insides.has(value))
                                || (!inside && !outsides.has(value))) {
                            candidateStore.removeCandidate(cellId, value);
                        }
                    }
                }
            }
        } else if (row.indexOf(1) >= 0 || row.indexOf(9) >= 0) {
            let indexOf19 = row.indexOf(1);
            if (indexOf19 < 0) indexOf19 = row.indexOf(9);

            const possibleLens = new Set(sandwichLengths[sandwichSum]);
            for (let i = 0; i < 9; i++) {
                if (row[i] === 0) {
                    if (!possibleLens.has(Math.abs(i - indexOf19) - 1)) {
                        const cellId = toCellId(rowId, i);
                        candidateStore.removeCandidate(cellId, 1);
                        candidateStore.removeCandidate(cellId, 9);
                    }
                }
            }
        }
    }

    // For column.
    if (board.colSandwich[colId].value !== null) {
        const col = getColValues(colId, values);
        const sandwichSum: number = board.colSandwich[colId].value as number;

        if (col.indexOf(1) >= 0 && col.indexOf(9) >= 0) {
            const [insides, outsides] = getValidSandwichValues(sandwichSum, col);
            let inside = false;
            for (let i = 0; i < 9; i++) {
                if (col[i] === 1 || col[i] === 9) {
                    inside = !inside;
                } else if (col[i] === 0) {
                    for (let value = 1; value <= 9; value++) {
                        const cellId = toCellId(i, colId);
                        if ((inside && !insides.has(value))
                                || (!inside && !outsides.has(value))) {
                            candidateStore.removeCandidate(cellId, value);
                        }
                    }
                }
            }
        } else if (col.indexOf(1) >= 0 || col.indexOf(9) >= 0) {
            let indexOf19 = col.indexOf(1);
            if (indexOf19 < 0) indexOf19 = col.indexOf(9);

            const possibleLens = new Set(sandwichLengths[sandwichSum]);
            for (let i = 0; i < 9; i++) {
                if (col[i] === 0) {
                    if (!possibleLens.has(Math.abs(i - indexOf19) - 1)) {
                        const cellId = toCellId(i, colId);
                        candidateStore.removeCandidate(cellId, 1);
                        candidateStore.removeCandidate(cellId, 9);
                    }
                }
            }
        }
    }
};

// Input:
// - board, control: model instances, so that we can get visible cells of a cell.
// - values: array with length 9*9, representing the filled values board.
// - candidates: array with length 9*9, where each element is a bitmask representing possible values for that cell.
// 
// Return: array of 2 elements:
// - First element is either a solution or null
// - Number of solutions we find. We always break at >= 2 solutions.
const attempt = (
        board: BoardModel,
        control: ControlModel,
        values: Array<number>,
        candidateStore: CandidateStore,
        ): [BoardModel | null, number] => {
    
    // Find cell with minimum number of candidates.
    let [cntCandidates, cellId] = candidateStore.getBestCell();

    if (cntCandidates === 0) {
        return [null, 0];
    }
    if (cntCandidates < 0) {
        let solution = _.cloneDeep(board);
        for (let i = 0; i < 81; i++) {
            if (values[i] === 0) {
                throw new Error(`Invalid state: cannot find a value for cell ID ${i}`);
            }
            solution.setValueOfSingleCell(i, String.fromCharCode(48 + values[i]) as CellValue, control.gameOptions, false);
        }
        return [solution, 1];
    }

    let firstSolution = null;
    let cntSolutions = 0;

    let candidates = candidateStore.getCandidates(cellId);
    for (let value of candidates) {
        const saveValues = _.clone(values);
        const saveCandidates = _.clone(candidateStore.candidates);

        values[cellId] = value;
        candidateStore.removeCell(cellId);
        const neighborIds = board.getVisibleCells(cellId, control.gameOptions);
        for (let neighborId of neighborIds) {
            candidateStore.removeCandidate(neighborId, value);
        };
        if (control.gameOptions.sandwich) {
            applySandwichClues(board, toRowId(cellId), toColId(cellId), values, candidateStore);
        }

        let [solution, cnt] = attempt(board, control, values, candidateStore);
        if (cnt > 0) {
            if (firstSolution === null) {
                firstSolution = solution;
            }
            cntSolutions += cnt;
            if (cntSolutions >= 2) {
                break;
            }
        }

        values = saveValues;
        candidateStore = new CandidateStore(saveCandidates);
    }
    return [firstSolution, cntSolutions];
};

// Input:
// - board: A Sandwich Sudoku board.
// - control: ControlModel instance.
// - values: array with length 9*9, representing the filled values board.
// - candidates: array with length 9*9, where each element is a bitmask representing possible values for that cell.
//
// Return: array of 2 elements:
// - First element is either a solution or null
// - Number of solutions we find. We always break at >= 2 solutions.
const attemptSandwich = (
        board: BoardModel,
        control: ControlModel,
        values: Array<number>,
        candidateStore: CandidateStore
        ): [BoardModel | null, number] => {
    // Find row / column with least number of candidates for 1/9.
    let bestCount = 1000;
    let isRow = false;
    let bestId = -1;
    let oneOrNine = 1;
    for (let i = 0; i < 9; i++) {
        // row
        if (board.rowSandwich[i].value !== null) {
            let cnt1 = 0;
            let cnt9 = 0;
            for (let col = 0; col < 9; col++) {
                const cellId = toCellId(i, col);
                if (values[cellId] === 0) {
                    if (candidateStore.hasCandidate(cellId, 1)) cnt1 += 1;
                    if (candidateStore.hasCandidate(cellId, 9)) cnt9 += 1;
                }
            }
            if (cnt1 > 0 && cnt1 < bestCount) {
                bestCount = cnt1;
                isRow = true;
                bestId = i;
                oneOrNine = 1;
            }
            if (cnt9 > 0 && cnt9 < bestCount) {
                bestCount = cnt9;
                isRow = true;
                bestId = i;
                oneOrNine = 9;
            }
        }
        // col
        if (board.colSandwich[i].value !== null) {
            let cnt1 = 0;
            let cnt9 = 0;
            for (let row = 0; row < 9; row++) {
                const cellId = toCellId(row, i);
                if (values[cellId] === 0) {
                    if (candidateStore.hasCandidate(cellId, 1)) cnt1 += 1;
                    if (candidateStore.hasCandidate(cellId, 9)) cnt9 += 1;
                }
            }
            if (cnt1 > 0 && cnt1 < bestCount) {
                bestCount = cnt1;
                isRow = false;
                bestId = i;
                oneOrNine = 1;
            }
            if (cnt9 > 0 && cnt9 < bestCount) {
                bestCount = cnt9;
                isRow = false;
                bestId = i;
                oneOrNine = 9;
            }
        }
    }

    if (bestId < 0) {
        // No row / column with sandwich clue has missing 1/9.
        return attempt(board, control, values, candidateStore);
    }

    // Check whether some cells have become invalid.
    let cntCandidates = candidateStore.getBestCell()[0];
    if (cntCandidates === 0) {
        return [null, 0];
    }

    let firstSolution = null;
    let cntSolutions = 0;
    for (let i = 0; i < 9; i++) {
        const cellId = isRow ? toCellId(bestId, i) : toCellId(i, bestId);

        if (values[cellId] === 0 && candidateStore.hasCandidate(cellId, oneOrNine)) {
            const saveValues = _.clone(values);
            const saveCandidates = _.clone(candidateStore.candidates);

            values[cellId] = oneOrNine;
            candidateStore.removeCell(cellId);
            const neighborIds = board.getVisibleCells(cellId, control.gameOptions);
            for (let neighborId of neighborIds) {
                candidateStore.removeCandidate(neighborId, oneOrNine)
            };
            if (control.gameOptions.sandwich) {
                applySandwichClues(board, toRowId(cellId), toColId(cellId), values, candidateStore);
            }
            let [solution, cnt] = attemptSandwich(board, control, values, candidateStore);
            if (cnt > 0) {
                if (firstSolution === null) {
                    firstSolution = solution;
                }
                cntSolutions += cnt;
                if (cntSolutions >= 2) {
                    break;
                }
            }

            values = saveValues;
            candidateStore = new CandidateStore(saveCandidates);
        }
    }
    return [firstSolution, cntSolutions];
}

export const solveBoard = (board: BoardModel, control: ControlModel): [BoardModel | null, number] => {
    let newBoard = _.cloneDeep(board);
    newBoard.fillAllPossibleValues(control.gameOptions);

    let values = newBoard.cells.map(cell => {
        if (!cell.value) return 0;
        else return +cell.value;
    });
    let candidates = newBoard.cells.map(cell => {
        if (cell.value !== null) {
            return 0;
        }
        let mask = 0;
        for (let value of cell.centerValues) {
            if (value !== null) {
                mask += 1 << (+value);
            }
        }
        return mask;
    });

    // Use sandwich clues for filled cells.
    if (control.gameOptions.sandwich) {
        for (let i = 0; i < 9; i++) {
            if (!newBoard.rowSandwich[i].isValid()) {
                return [null, 0];
            }
            if (!newBoard.colSandwich[i].isValid()) {
                return [null, 0];
            }
        }
        let candidateStore = new CandidateStore(candidates);
        for (let i = 0; i < 81; i++) {
            if (values[i] > 0) {
                applySandwichClues(newBoard, toRowId(i), toColId(i), values, candidateStore);
            }
        }
        return attemptSandwich(newBoard, control, values, candidateStore);
    }

    return attempt(newBoard, control, values, new CandidateStore(candidates));
};
