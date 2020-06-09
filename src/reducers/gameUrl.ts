import { ACTION_GENERATE_URL, ActionTypes } from '../actions/types';

export const gameUrlReducer = (gameUrl = null, action: ActionTypes) => {
    if (action.type === ACTION_GENERATE_URL) {
        return action.payload.url;
    }
    return gameUrl;
}
