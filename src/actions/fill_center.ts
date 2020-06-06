import _ from 'lodash';

import { ActionTypes } from './types';
import { BoardModel } from '../models/board';
import { ControlModel } from '../models/control';
import { updateBoard } from './board';

export const fillCenter = (board: BoardModel, control: ControlModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.fillAllPossibleValues(control.gamePlay);
    return updateBoard(newBoard);
}
