import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Control extends React.Component {
    render() {
        return (
            <Form>
                <Button onClick={this.props.onClickVerify}>
                    Verify
                </Button>
                <hr/>
                <h4>Display Options</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-highlight-restricted'
                    label='Highlight restricted'
                    checked={this.props.control.displayOptions.highlightRestricted}
                    onChange={this.props.onToggleHighlightRestricted}
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
