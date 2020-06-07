import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DisplayOptions from './DisplayOptions';
import GameOptions from './GameOptions';


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
                <GameOptions />
                <hr/>
                <h4>Help</h4>
                <Button
                    onClick={this.props.onClickFillCenters}
                    className="btn-secondary"
                >
                    Fill all center values
                </Button>
                &nbsp;
                <Button
                    onClick={this.props.solve}
                    className="btn-secondary"
                >
                    Solve
                </Button>
            </Form>
        );
    }
}

type ControlProps = {
    onClickVerify: () => void,
    onClickUndo: () => void,
    onClickRedo: () => void,
    solve: () => void,

    onClickFillCenters: () => void,
};

export default Control;
