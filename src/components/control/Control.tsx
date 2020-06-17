import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect, ConnectedProps } from 'react-redux';
import {
    fillCenter,
    generateUrl,
    solve,
    verify
    } from '../../actions/control';
import { redo, undo } from '../../actions/history';
import { GameState } from '../Game';
import DisplayOptions from './DisplayOptions';
import GameOptions from './GameOptions';


class Control extends React.Component<ControlProps> {
    renderUrl() {
        if (!this.props.url) {
            return;
        }
        return <a href={this.props.url}>Link</a>;
    }

    renderTooltip(id: string, message: string) {
        return (
            <Tooltip id={id}>
                {message}
            </Tooltip>
        );
    }

    render() {
        return (
            <Form>
                <div className="">
                    <Button onClick={() => this.props.verify(this.props.board, this.props.control)}>
                        Verify
                    </Button>
                    &nbsp;
                    <Button
                        onClick={() => this.props.undo(this.props.history)}
                        className="btn-secondary"
                    >
                        Undo
                    </Button>
                    &nbsp;
                    <Button
                        onClick={() => this.props.redo(this.props.history)}
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
                <OverlayTrigger
                    placement="top"
                    overlay={this.renderTooltip('tooltip-fill-center', 'Show all possible values for each cell.')}
                >
                    <Button
                        onClick={() => this.props.fillCenter(this.props.board, this.props.control)}
                        className="btn-secondary"
                    >
                        Fill all center values
                    </Button>
                </OverlayTrigger>
                &nbsp;
                <Button
                    onClick={() => this.props.solve(this.props.board, this.props.control)}
                    className="btn-secondary"
                >
                    Solve
                </Button>
                <hr/>
                <Button
                    onClick={() => this.props.generateUrl(this.props.board, this.props.control)}
                    className="btn-secondary"
                >
                    Get URL
                </Button>
                &nbsp;
                {this.renderUrl()}
            </Form>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {
        url: state.gameUrl,
        history: state.history,
        board: state.board,
        control: state.control,
    };
};
const connector = connect(mapStateToProps, {
    // History actions
    undo,
    redo,

    // Control actions.
    fillCenter,
    generateUrl,
    solve,
    verify,
});
type ControlProps = ConnectedProps<typeof connector>;

export default connector(Control);
