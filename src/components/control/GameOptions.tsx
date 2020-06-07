import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect, ConnectedProps } from 'react-redux';
import { updateGameOptions } from '../../actions/control';
import { GameState } from '../Game';


class GameOptions extends React.Component<GameOptionsProps> {
    render() {
        return (
            <div id="game-play">
                <h4>Game Play</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-knight'
                    label='Anti Knight'
                    checked={this.props.antiKnight}
                    onChange={() => this.props.updateGameOptions({
                        ...this.props,
                        antiKnight: !this.props.antiKnight
                    })}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-king'
                    label='Anti King'
                    checked={this.props.antiKing}
                    onChange={() => this.props.updateGameOptions({
                        ...this.props,
                        antiKing: !this.props.antiKing
                    })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {...state.control.gameOptions};
};

const connector = connect(mapStateToProps, { updateGameOptions: updateGameOptions });

type GameOptionsProps = ConnectedProps<typeof connector>;

export default connector(GameOptions);
