export type GameOptions = {
    antiKnight: boolean;
    antiKing: boolean;
};

export type DisplayOptions = {
    highlightRestricted: boolean;
    highlightMatchingNumbers: boolean;
    autoCleanUp: boolean;
};

export class ControlModel {
    displayOptions: DisplayOptions;
    gameOptions: GameOptions;

    constructor() {
        this.displayOptions = {
            highlightRestricted: true,
            highlightMatchingNumbers: false,
            autoCleanUp: false,
        };
        this.gameOptions = {
            antiKnight: false,
            antiKing: false,
        };
    }
}