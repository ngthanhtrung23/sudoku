export type GameOptions = {
    antiKnight: boolean;
    antiKing: boolean;
    sandwich: boolean;
};

export type DisplayOptions = {
    highlightRestricted: boolean;
    highlightMatchingNumbers: boolean;
    autoCleanUp: boolean;
    sandwichHint: boolean;
};

export class ControlModel {
    displayOptions: DisplayOptions;
    gameOptions: GameOptions;

    constructor() {
        this.displayOptions = {
            highlightRestricted: true,
            highlightMatchingNumbers: false,
            autoCleanUp: false,
            sandwichHint: false,
        };
        this.gameOptions = {
            antiKnight: false,
            antiKing: false,
            sandwich: false,
        };
    }
}
