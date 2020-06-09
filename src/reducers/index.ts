import { combineReducers } from 'redux';
import { boardReducer } from './board';
import { controlReducer } from './control';
import { gameUrlReducer } from './gameUrl';
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
    gameUrl: gameUrlReducer,
});
