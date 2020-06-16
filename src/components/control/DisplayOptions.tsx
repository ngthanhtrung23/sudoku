import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect, ConnectedProps } from 'react-redux';
import { updateDisplay } from '../../actions/control';
import { GameState } from '../Game';


class DisplayOptions extends React.Component<DisplayOptionsProps> {
    renderSandwichDisplayOptions() {
        if (this.props.sandwich) {
            return (
                <Form.Check
                    type='checkbox'
                    id='checkbox-sandwich-hint'
                    label='Show Sandwich sum hints'
                    checked={this.props.sandwichHint}
                    onChange={() => this.props.updateDisplay({
                        ...this.props,
                        sandwichHint: !this.props.sandwichHint
                    })}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <div id="display-options">
                <h4>Display Options</h4>
                <Form.Check
                    type='checkbox'
                    id='checkbox-highlight-restricted'
                    label='Highlight restricted cells'
                    checked={this.props.highlightRestricted}
                    onChange={() => this.props.updateDisplay({
                        ...this.props,
                        highlightRestricted: !this.props.highlightRestricted
                    })}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-highlight-matching-numbers'
                    label='Highlight matching numbers'
                    checked={this.props.highlightMatchingNumbers}
                    onChange={() => this.props.updateDisplay({
                        ...this.props,
                        highlightMatchingNumbers: !this.props.highlightMatchingNumbers
                    })}
                />
                <Form.Check
                    type='checkbox'
                    id='checkbox-auto-cleanup'
                    label='Auto Cleanup corner &amp; center values'
                    checked={this.props.autoCleanUp}
                    onChange={() => this.props.updateDisplay({
                        ...this.props,
                        autoCleanUp: !this.props.autoCleanUp
                    })}
                />
                {this.renderSandwichDisplayOptions()}
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {...state.control.displayOptions, ...state.control.gameOptions};
};

const connector = connect(mapStateToProps, { updateDisplay });

type DisplayOptionsProps = ConnectedProps<typeof connector>;

export default connector(DisplayOptions);
