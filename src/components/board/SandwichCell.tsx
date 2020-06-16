import React from 'react';
import { QuestionSquare } from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect, ConnectedProps } from 'react-redux';
import { SandwichCellModel } from '../../models/sandwichCell';
import { sumToSeqs } from '../../utils/sandwich';
import { GameState } from '../Game';


class SandwichCell extends React.Component<SandwichCellProps> {
    renderSandwichHint() {
        if (!this.props.sandwichHint || this.props.value.value === null || this.props.value.value === 0) {
            return;
        }

        const seqs = sumToSeqs[this.props.value.value].map((seq: Array<number>, index: number) => {
            return (
                <div key={`tooltip-sandwich-${this.props.value.id}-${index}`}>
                    {seq.join(' ')}
                </div>
            );
        });
        const tooltip = (
            <Tooltip id={`tooltip-sandwich-${this.props.value.id}`}>
                <div>{seqs}</div>
            </Tooltip>
        );
        return (
            <div className="sandwich-corner-value">
                <OverlayTrigger
                    placement="right"
                    overlay={tooltip}>
                    <QuestionSquare />
                </OverlayTrigger>
            </div>
        );
    }

    render() {
        let defaultValue = (this.props.value.value === null) ? undefined : this.props.value.value;

        let classes = ['sandwich-cell'];
        if (this.props.value.selected) {
            classes.push('selected');
        } else if (this.props.value.isFixed) {
            classes.push('fixed');
        }
        if (this.props.value.error) {
            classes.push('error');
        }

        return (
            <div
                onClick={this.props.onClick}
                className={classes.join(' ')}
            >
                <div className="cell-main-value">
                    {defaultValue}
                </div>
                {this.renderSandwichHint()}
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {
        sandwichHint: state.control.displayOptions.sandwichHint,
    };
};

const connector = connect(mapStateToProps);
type SandwichCellProps = ConnectedProps<typeof connector> & {
    value: SandwichCellModel,
    onClick: (e: any) => void,
}

export default connector(SandwichCell);