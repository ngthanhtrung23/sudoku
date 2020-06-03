import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Control extends React.Component {
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
                <h4>Display Options</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-highlight-restricted'
                    label='Highlight restricted cells'
                    checked={this.props.control.displayOptions.highlightRestricted}
                    onChange={this.props.onToggleHighlightRestricted}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-highlight-matching-numbers'
                    label='Highlight matching numbers'
                    checked={this.props.control.displayOptions.highlightMatchingNumbers}
                    onChange={this.props.onToggleHighlightMatchingNumbers}
                />
                <hr/>
                <h4>Game Play</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-knight'
                    label='Anti Knight'
                    checked={this.props.control.gamePlay.antiKnight}
                    onChange={this.props.onToggleAntiKnight}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-anti-king'
                    label='Anti King'
                    checked={this.props.control.gamePlay.antiKing}
                    onChange={this.props.onToggleAntiKing}
                />
            </Form>
        );
    }
}

export default Control;
