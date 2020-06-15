import React from 'react';
import { QuestionSquare } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect, ConnectedProps } from 'react-redux';
import { updateGameOptions } from '../../actions/control';
import { GameState } from '../Game';


class GameOptions extends React.Component<GameOptionsProps> {
    renderLabel(label: any, id: string, message: string) {
        return (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={id}>{message}</Tooltip>}
            >
                <span>
                    {label}&nbsp;
                    <QuestionSquare />
                </span>
            </OverlayTrigger>
        );
    }

    render() {
        return (
            <div id="game-play">
                <h4>Game Play</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-knight'
                    label={this.renderLabel('Anti Knight', 'tooltip-anti-knight', "Two cells which are knight's move away from each other cannot contain the same digit.")}
                    checked={this.props.antiKnight}
                    onChange={() => this.props.updateGameOptions({
                        ...this.props,
                        antiKnight: !this.props.antiKnight
                    })}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-king'
                    label={this.renderLabel('Anti King', 'tooltip-anti-king', "Two cells which are king's move away from each other cannot contain the same digit.")}
                    checked={this.props.antiKing}
                    onChange={() => this.props.updateGameOptions({
                        ...this.props,
                        antiKing: !this.props.antiKing
                    })}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-sandwich'
                    label={this.renderLabel('Sandwich', 'tooltip-sandwich', 'The numbers in each row / column specify the sum between the number 1 and 9 in that row / column.')}
                    checked={this.props.sandwich}
                    onChange={() => this.props.updateGameOptions({
                        ...this.props,
                        sandwich: !this.props.sandwich
                    })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {...state.control.gameOptions};
};

const connector = connect(mapStateToProps, { updateGameOptions });

type GameOptionsProps = ConnectedProps<typeof connector>;

export default connector(GameOptions);
