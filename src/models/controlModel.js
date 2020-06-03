class ControlModel {
    constructor() {
        this.displayOptions = {
            highlightRestricted: true,
        };
    }

    toggleHighlightRestricted() {
        this.displayOptions.highlightRestricted = !this.displayOptions.highlightRestricted;
    }
}

export default ControlModel;
