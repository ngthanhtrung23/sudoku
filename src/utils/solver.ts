import _ from 'lodash';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';
import { bitContains, bitCount, bitRemoveIfExists } from './bits';
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
const applySandwichClues = (board: BoardModel, rowId: number, colId: number, values: Array<number>, candidates: Array<number>): void => {
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
                            candidates[cellId] = bitRemoveIfExists(candidates[cellId], value);
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
                        candidates[cellId] = bitRemoveIfExists(candidates[cellId], 1);
                        candidates[cellId] = bitRemoveIfExists(candidates[cellId], 9);
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
                            candidates[cellId] = bitRemoveIfExists(candidates[cellId], value);
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
                        candidates[cellId] = bitRemoveIfExists(candidates[cellId], 1);
                        candidates[cellId] = bitRemoveIfExists(candidates[cellId], 9);
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
const attempt = (board: BoardModel, control: ControlModel, values: Array<number>, candidates: Array<number>): [BoardModel | null, number] => {
    // Find cell with minimum number of candidates.
    let bestId = -1;
    for (let i = 0; i < 81; i++) {
        if (values[i] === 0) {
            if (bestId < 0 || bitCount(values[i]) < bitCount(values[bestId])) {
                bestId = i;
            }
        }
    }
    if (bestId < 0) {
        // No more unfilled cell --> we have found a solution.
        let solution = _.cloneDeep(board);
        for (let i = 0; i < 81; i++) {
            solution.setValueOfSingleCell(i, String.fromCharCode(48 + values[i]) as CellValue, control.gameOptions, false);
        }
        return [solution, 1];
    }

    if (bitCount(candidates[bestId]) === 0) {
        return [null, 0];
    }

    let firstSolution = null;
    let cntSolutions = 0;
    for (let value = 1; value <= 9; value++) {
        if (bitContains(candidates[bestId], value)) {
            const saveValues = _.clone(values);
            const saveCandidates = _.clone(candidates);

            values[bestId] = value;
            const neighborIds = board.getVisibleCells(bestId, control.gameOptions);
            for (let neighborId of neighborIds) {
                candidates[neighborId] = bitRemoveIfExists(candidates[neighborId], value);
            };
            if (control.gameOptions.sandwich) {
                applySandwichClues(board, toRowId(bestId), toColId(bestId), values, candidates);
            }

            let [solution, cnt] = attempt(board, control, values, candidates);
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
            candidates = saveCandidates;
        }
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
const attemptSandwich = (board: BoardModel, control: ControlModel, values: Array<number>, candidates: Array<number>): [BoardModel | null, number] => {
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
                    const candidate = candidates[cellId];
                    if (bitContains(candidate, 1)) cnt1 += 1;
                    if (bitContains(candidate, 9)) cnt9 += 1;
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
                    const candidate = candidates[cellId];
                    if (bitContains(candidate, 1)) cnt1 += 1;
                    if (bitContains(candidate, 9)) cnt9 += 1;
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
        return attempt(board, control, values, candidates);
    }

    let firstSolution = null;
    let cntSolutions = 0;
    for (let i = 0; i < 9; i++) {
        const cellId = isRow ? toCellId(bestId, i) : toCellId(i, bestId);

        if (values[cellId] === 0 && bitContains(candidates[cellId], oneOrNine)) {
            const saveValues = _.clone(values);
            const saveCandidates = _.clone(candidates);

            values[cellId] = oneOrNine;
            const neighborIds = board.getVisibleCells(cellId, control.gameOptions);
            for (let neighborId of neighborIds) {
                candidates[neighborId] = bitRemoveIfExists(candidates[neighborId], oneOrNine);
            };
            if (control.gameOptions.sandwich) {
                applySandwichClues(board, toRowId(cellId), toColId(cellId), values, candidates);
            }
            let [solution, cnt] = attemptSandwich(board, control, values, candidates);
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
            candidates = saveCandidates;
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
        for (let i = 0; i < 81; i++) {
            if (values[i] > 0) {
                applySandwichClues(newBoard, toRowId(i), toColId(i), values, candidates);
            }
        }
        for (let i = 0; i < 81; i++) {
            if (values[i] > 0) {
                newBoard.cells[i].value = String(values[i]) as CellValue;
            }
            newBoard.cells[i].centerValues.clear();
            for (let value = 1; value <= 9; value++) {
                if (bitContains(candidates[i], value)) {
                    newBoard.cells[i].centerValues.add(String(value) as CellValue);
                }
            }
        }
        return attemptSandwich(newBoard, control, values, candidates);
    }

    return attempt(newBoard, control, values, candidates);
};
