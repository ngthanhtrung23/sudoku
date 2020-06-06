import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect, ConnectedProps } from 'react-redux';

import DisplayOptions from './DisplayOptions';
import GamePlay from './GamePlay';
import { GameState } from '../types';
import { updateDisplay } from '../../actions/control';

class Control extends React.Component<ControlProps> {
    render() {
        return (
            <Form>
                <div className="">
                    <Button onClick={this.props.onClickVerify}>
                        Verify
                    </Button>
                    &nbsp;
                    <Button
                        onClick={this.props.onClickUndo}
                        className="btn-secondary"
                    >
                        Undo
                    </Button>
                    &nbsp;
                    <Button
                        onClick={this.props.onClickRedo}
                        className="btn-secondary"
                    >
                        Redo
                    </Button>
                </div>
                <hr/>
                <DisplayOptions />
                <hr/>
                <GamePlay />
                <hr/>
                <h4>Help</h4>
                <Button
                    onClick={this.props.onClickFillCenters}
                    className="btn-secondary"
                >
                    Fill all center values
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {
        displayOptions: state.control.displayOptions,
        gamePlay: state.control.gamePlay,
    };
};

const connector = connect(mapStateToProps, {
    updateDisplay
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type ControlProps = PropsFromRedux & {
    onClickVerify: () => void,
    onClickUndo: () => void,
    onClickRedo: () => void,

    onClickFillCenters: () => void,
};

export default connector(Control);
