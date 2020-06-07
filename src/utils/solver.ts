import _ from 'lodash';
import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
import { ControlModel } from '../models/control';

const getValuesAndCenterValues = (board: BoardModel): [Array<CellValue>, Array<Set<CellValue>>] => {
    let cellValues: Array<CellValue> = [];
    let centerValues: Array<Set<CellValue>> = [];

    board.cells.forEach((cell) => {
        cellValues.push(cell.value);
        centerValues.push(_.clone(cell.centerValues));
    });

    return [cellValues, centerValues];
};

const loadValuesAndCenterValues = (board: BoardModel, [cellValues, centerValues]: [Array<CellValue>, Array<Set<CellValue>>]) => {
    for (let i = 0; i < 81; i++) {
        board.cells[i].value = cellValues[i];
        board.cells[i].centerValues = _.clone(centerValues[i]);
    }
};

const attempt = (board: BoardModel, control: ControlModel): [BoardModel | null, number] => {
    let minOptionsCellId = -1;
    for (let i = 0; i < 81; i++) {
        if (board.cells[i].value === null) {
            if (minOptionsCellId < 0 || board.cells[i].centerValues.size < board.cells[minOptionsCellId].centerValues.size) {
                minOptionsCellId = i;
            }
        }
    }
    if (minOptionsCellId < 0) {
        // All cells are filled.
        return [_.cloneDeep(board), 1];
    }

    const currentState = getValuesAndCenterValues(board);
    const options = board.cells[minOptionsCellId].centerValues;
    let cntSolutions = 0;
    let firstSolution: BoardModel | null = null;

    for (let option of options) {
        loadValuesAndCenterValues(board, currentState);
        board.clearAllSelections();
        board.setSelected(minOptionsCellId);
        board.setValueOfSelectedCells(option, control.gameOptions, true);

        let [solution, cnt] = attempt(board, control);
        if (cnt > 0) {
            if (firstSolution === null) {
                firstSolution = solution;
                firstSolution?.clearAllSelections();
                firstSolution?.clearAllRestricteds();
            }
            cntSolutions += cnt;
            if (cntSolutions >= 2) {
                break;
            }
        }
    };

    return [firstSolution, cntSolutions];
};

export const solveBoard = (board: BoardModel, control: ControlModel): [BoardModel | null, number] => {
    let newBoard = _.cloneDeep(board);
    newBoard.fillAllPossibleValues(control.gameOptions);
    return attempt(newBoard, control);
};
