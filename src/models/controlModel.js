class ControlModel {
    constructor() {
        this.displayOptions = {
            highlightRestricted: true,
        };
        this.gamePlay = {
            antiKnight: false,
        };
    }

    toggleHighlightRestricted() {
        this.displayOptions.highlightRestricted = !this.displayOptions.highlightRestricted;
    }

    toggleAntiKnight() {
        this.gamePlay.antiKnight = !this.gamePlay.antiKnight;
    }
}

export default ControlModel;
