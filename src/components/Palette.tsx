import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect, ConnectedProps } from 'react-redux';
import { clearAllColors, color } from '../actions/board';
import { GameState } from './Game';


class Palette extends React.Component<PaletteProps> {
    renderColor(id: number) {
        let classes = ["palette-cell", `color-${id}`];
        return (
            <div
                className={classes.join(' ')}
                key={`palette-${id}`}
                onClick={() => this.props.color(this.props.board, id)}
            >
            </div>
        );
    }
    render() {
        const colors = [...Array(5).keys()].map(x => this.renderColor(x));
        return (
            <div className="row palette">
                {colors}
                <Button
                    className="btn-secondary"
                    onClick={() => this.props.clearAllColors(this.props.board)}
                >
                    Clear All Colors
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {
        board: state.board,
    };
};

const connector = connect(mapStateToProps, {
    clearAllColors,
    color,
});

type PaletteProps = ConnectedProps<typeof connector>;

export default connector(Palette);
