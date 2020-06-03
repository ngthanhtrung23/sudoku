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
                <Form.Check
                    type='checkbox'
                    id='checkbox-highlight-restricted'
                    label='Highlight restricted'
                    checked={this.props.control.displayOptions.highlightRestricted}
                    onChange={this.props.onToggleHighlightRestricted}
                />
            </Form>
        );
    }
}

export default Control;
