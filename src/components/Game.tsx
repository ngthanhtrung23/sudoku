import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
    generateUrl,
    initGameState,
    keyDown,
    mouseDown,
    mouseOver,
    mouseUp,
    select,
    selectSandwich
    } from '../actions/board';
import { fillCenter, solve, verify } from '../actions/control';
import { redo, undo } from '../actions/history';
import { BoardModel } from '../models/board';
import { ControlModel } from '../models/control';
import { HistoryModel } from '../models/history';
import Board from './board/Board';
import Control from './control/Control';


export type GameState = {
    board: BoardModel,
    control: ControlModel,
    history: HistoryModel,
    gameUrl: string,
};

class Game extends React.Component<GameProps, GameState> {
    componentDidMount() {
        if (this.props.encoded) {
            this.props.initGameState(JSON.parse(window.atob(this.props.encoded)));
        }
    }

    render() {
        return (
            <div
                onKeyDown={(e) => this.props.keyDown(this.props.board, this.props.control, this.props.history, e)}
                tabIndex={0}
                className="container"
                onMouseUp={() => this.props.mouseUp(this.props.board)}
            >
                <h1><a href="/sudoku">Sudoku Tool</a></h1>
                <div className="row">
                    <div className="col-sm">
                        <Board
                            board={this.props.board}
                            gameOptions={this.props.control.gameOptions}
                            onClick={(e, id) => this.props.select(this.props.board, this.props.control, id, !e.metaKey)}
                            onSelectSandwich={(e, isRow, id) => this.props.selectSandwich(this.props.board, this.props.control, isRow, id)}
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
                            solve={() => this.props.solve(this.props.board, this.props.control)}
                            generateUrl={() => this.props.generateUrl(this.props.board, this.props.control)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

type OwnProps = RouteComponentProps<{encoded: string}>;
const mapStateToProps = (state: GameState, ownProps: OwnProps) => {
    return {
        ...state,
        encoded: ownProps.match.params.encoded,
    };
};

const connector = connect(mapStateToProps, {
    // history actions.
    redo,
    undo,

    // board actions.
    initGameState,
    generateUrl,
    keyDown,
    mouseDown,
    mouseOver,
    mouseUp,
    select,
    selectSandwich,

    // control actions.
    fillCenter,
    verify,
    solve,
});

type GameProps = ConnectedProps<typeof connector>;

export default connector(Game);
