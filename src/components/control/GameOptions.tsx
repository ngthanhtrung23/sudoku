import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect, ConnectedProps } from 'react-redux';

import { updateGameOptions } from '../../actions/control';
import { GameState } from '../Game';

class GamePlay extends React.Component<GamePlayProps> {
    render() {
        return (
            <div id="game-play">
                <h4>Game Play</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-knight'
                    label='Anti Knight'
                    checked={this.props.antiKnight}
                    onChange={() => this.props.updateGamePlay({
                        ...this.props,
                        antiKnight: !this.props.antiKnight
                    })}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-king'
                    label='Anti King'
                    checked={this.props.antiKing}
                    onChange={() => this.props.updateGamePlay({
                        ...this.props,
                        antiKing: !this.props.antiKing
                    })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {...state.control.gamePlay};
};

const connector = connect(mapStateToProps, { updateGamePlay: updateGameOptions });

type GamePlayProps = ConnectedProps<typeof connector>;

export default connector(GamePlay);
