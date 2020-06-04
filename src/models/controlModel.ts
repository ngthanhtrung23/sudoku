type GamePlay = {
    antiKnight: boolean;
    antiKing: boolean;
};

class ControlModel {
    displayOptions: {
        highlightRestricted: boolean;
        highlightMatchingNumbers: boolean;
        autoCleanUp: boolean;
    };
    gamePlay: {
        antiKnight: boolean;
        antiKing: boolean;
    };

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

    toggleHighlightRestricted(): void {
        this.displayOptions.highlightRestricted = !this.displayOptions.highlightRestricted;
    }

    toggleHighlightMatchingNumbers(): void {
        this.displayOptions.highlightMatchingNumbers = !this.displayOptions.highlightMatchingNumbers;
    }

    toggleAutoCleanUp(): void {
        this.displayOptions.autoCleanUp = !this.displayOptions.autoCleanUp;
    }

    toggleAntiKnight(): void {
        this.gamePlay.antiKnight = !this.gamePlay.antiKnight;
    }

    toggleAntiKing(): void {
        this.gamePlay.antiKing = !this.gamePlay.antiKing;
    }
}

export { ControlModel };
export type { GamePlay };
