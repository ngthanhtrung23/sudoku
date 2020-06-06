import { BoardModel } from '../models/board';
import { CellValue } from '../models/cell';
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
