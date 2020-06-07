import _ from 'lodash';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';

const bitCount = (n: number): number => {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

const bitContains = (n: number, bit: number): boolean => {
    return ((n >> bit) & 1) > 0;
}

const bitRemoveIfExists = (n: number, bit: number): number => {
    if (!bitContains(n, bit)) {
        return n;
    }
    return n - (1<<bit);
}

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
            board.getVisibleCells(bestId, control.gameOptions).forEach((neighborId) => {
                candidates[neighborId] = bitRemoveIfExists(candidates[neighborId], value);
            });

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
    return attempt(newBoard, control, values, candidates);
};
