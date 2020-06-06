import { ActionTypes, ACTION_UPDATE_DISPLAY, ACTION_UPDATE_GAME_PLAY } from '../actions/types';
import { ControlModel } from '../models/control';

export const controlReducer = (control: ControlModel = new ControlModel(), action: ActionTypes) => {
    if (action.type === ACTION_UPDATE_DISPLAY) {
        return {...control, displayOptions: action.payload};
    }
    if (action.type === ACTION_UPDATE_GAME_PLAY) {
        return {...control, gamePlay: action.payload};
    }
    return control;
};
