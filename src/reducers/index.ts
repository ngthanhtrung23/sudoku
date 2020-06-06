import { combineReducers } from 'redux';

import { BoardModel } from '../models/boardModel';
import { controlReducer } from './control';

const boardReducer = (board = new BoardModel()) => {
    return board;
};

const historyReducer = (history: Array<string> = []) => {
    if (history.length === 0) {
        const board = new BoardModel();
        history.push(board.serialize());
    }
    return history;
};

const historyIdReducer = (historyId = 0) => {
    return historyId;
}

const isMouseDownReducer = (isMouseDown = false) => {
    return isMouseDown;
}

const highlightMatchingReducer = (highlightMatching = null) => {
    return highlightMatching;
}

export default combineReducers({
    board: boardReducer,
    control: controlReducer,
    history: historyReducer,
    historyId: historyIdReducer,
    isMouseDown: isMouseDownReducer,
    highlightMatching: highlightMatchingReducer,
});
