import React from 'react';
import Button from 'react-bootstrap/Button';

class Control extends React.Component {
    render() {
        return (
            <Button onClick={this.props.onClickVerify}>
                Verify
            </Button>
        );
    }
}

export { Control };
