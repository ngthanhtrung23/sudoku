class ControlModel {
    constructor() {
        this.displayOptions = {
            highlightRestricted: true,
            highlightMatchingNumbers: false,
            autoCleanUp: false,
        };
        this.gamePlay = {
            antiKnight: false,
            antiKing: false,
        };
    }

    toggleHighlightRestricted() {
        this.displayOptions.highlightRestricted = !this.displayOptions.highlightRestricted;
    }

    toggleHighlightMatchingNumbers() {
        this.displayOptions.highlightMatchingNumbers = !this.displayOptions.highlightMatchingNumbers;
    }

    toggleAutoCleanUp() {
        this.displayOptions.autoCleanUp = !this.displayOptions.autoCleanUp;
    }

    toggleAntiKnight() {
        this.gamePlay.antiKnight = !this.gamePlay.antiKnight;
    }

    toggleAntiKing() {
        this.gamePlay.antiKing = !this.gamePlay.antiKing;
    }
}

export default ControlModel;
