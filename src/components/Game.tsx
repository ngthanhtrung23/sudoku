import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Board from './board/Board';
import Control from './control/Control';
import { BoardModel } from '../models/board';
import { ControlModel } from '../models/control';
import { keyDown, mouseDown, mouseOver, mouseUp, select } from '../actions/board';
import { fillCenter, verify } from '../actions/control';
import { redo, undo } from '../actions/history';
import { HistoryModel } from '../models/history';

export type GameState = {
    board: BoardModel,
    control: ControlModel,
    history: HistoryModel,
};

class Game extends React.Component<GameProps, GameState> {
    render() {
        return (
            <div
                onKeyDown={(e) => this.props.keyDown(this.props.board, this.props.control, this.props.history, e)}
                tabIndex={0}
                className="container"
                onMouseUp={() => this.props.mouseUp(this.props.board)}
            >
                <h1>Sudoku Tool</h1>
                <div className="row">
                    <div className="col-sm">
                        <Board
                            board={this.props.board}
                            onClick={(e, id) => this.props.select(this.props.board, this.props.control, id, !e.metaKey)}
                            onMouseDown={(e, id) => this.props.mouseDown(this.props.board, this.props.control, id, !e.metaKey)}
                            onMouseOver={(id) => this.props.mouseOver(this.props.board, this.props.control, id)}
                        />
                    </div>
                    <div className="col-sm">
                        <Control
                            onClickVerify={() => this.props.verify(this.props.board, this.props.control)}
                            onClickUndo={() => this.props.undo(this.props.history)}
                            onClickRedo={() => this.props.redo(this.props.history)}
                            onClickFillCenters={() => this.props.fillCenter(this.props.board, this.props.control)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {...state};
};

const connector = connect(mapStateToProps, {
    // history actions.
    redo: redo,
    undo: undo,

    // board actions.
    keyDown: keyDown,
    mouseDown: mouseDown,
    mouseOver: mouseOver,
    mouseUp: mouseUp,
    select: select,

    // control actions.
    fillCenter: fillCenter,
    verify: verify,
});

type GameProps = ConnectedProps<typeof connector>;

export default connector(Game);
