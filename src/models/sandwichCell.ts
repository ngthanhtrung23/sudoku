export class SandwichCellModel {
    value: number | null;
    selected: boolean;
    error: boolean;
    isFixed: boolean;
    id: string;

    constructor(id: string) {
        this.id = id;
        this.value = null;
        this.selected = false;
        this.error = false;
        this.isFixed = false;
    }

    isValid(): boolean {
        return this.value === null
            || this.value === 0
            || this.value === 35
            || (2 <= this.value && this.value <= 33);
    }
};