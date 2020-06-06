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
    gamePlay: GameOptions;

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
}
