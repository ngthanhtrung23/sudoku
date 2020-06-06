import { combineReducers } from 'redux';

import { controlReducer } from './control';
import { boardReducer } from './board';
import { historyReducer } from './history';

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
    isMouseDown: isMouseDownReducer,
    highlightMatching: highlightMatchingReducer,
});
