import _ from 'lodash';

import { ActionTypes } from './types';
import { BoardModel } from '../models/board';
import { ControlModel } from '../models/control';
import { updateBoard } from './board';

export const verify = (board: BoardModel, control: ControlModel): ActionTypes => {
    let newBoard = _.cloneDeep(board);
    newBoard.clearAllErrors();
    let invalidCellIds = newBoard.getInvalidCellIds(control.gamePlay);
    newBoard.setErrors(invalidCellIds);

    alert(invalidCellIds.size > 0 ? 'Error found :(' : 'LGTM!');
    return updateBoard(newBoard);
}
