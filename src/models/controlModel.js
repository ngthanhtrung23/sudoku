class ControlModel {
    constructor() {
        this.displayOptions = {
            highlightRestricted: true,
        };
        this.gamePlay = {
            antiKnight: false,
            antiKing: false,
        };
    }

    toggleHighlightRestricted() {
        this.displayOptions.highlightRestricted = !this.displayOptions.highlightRestricted;
    }

    toggleAntiKnight() {
        this.gamePlay.antiKnight = !this.gamePlay.antiKnight;
    }

    toggleAntiKing() {
        this.gamePlay.antiKing = !this.gamePlay.antiKing;
    }
}

export default ControlModel;
