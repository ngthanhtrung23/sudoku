import React from 'react';
import { SandwichCellModel } from '../../models/sandwichCell';


type SandwichCellProps = {
    value: SandwichCellModel,
    onClick: (e: any) => void,
};

class SandwichCell extends React.Component<SandwichCellProps> {
    render() {
        let defaultValue = (this.props.value.value === null) ? undefined : this.props.value.value;

        let classes = ['sandwich-cell'];
        if (this.props.value.selected) {
            classes.push('selected');
        } else if (this.props.value.error) {
            classes.push('error');
        }
        return (
            <div
                onClick={this.props.onClick}
                className={classes.join(' ')}>
                <div className="cell-main-value">
                    {defaultValue}
                </div>
            </div>
        );
    }
}

export default SandwichCell;