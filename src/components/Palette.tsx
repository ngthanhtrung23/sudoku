import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { color } from '../actions/board';
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
            </div>
        );
    }
}

const mapStateToProps = (state: GameState) => {
    return {
        board: state.board,
    };
};

const connector = connect(mapStateToProps, { color });

type PaletteProps = ConnectedProps<typeof connector>;

export default connector(Palette);
