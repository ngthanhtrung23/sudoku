import { BoardModel } from '../models/boardModel';
import { CellValue } from '../models/cellModel';
import { ControlModel } from '../models/control';

export type GameProps = {
};

export type GameState = {
    board: BoardModel,
    control: ControlModel,

    history: Array<string>,
    historyId: number,

    isMouseDown: boolean,
    highlightMatching: CellValue,
};
