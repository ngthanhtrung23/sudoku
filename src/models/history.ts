import { BoardModel } from "./board";

export class HistoryModel {
    boards: Array<string>;
    id: number;

    constructor() {
        this.boards = [];
        this.id = 0;

        const board = new BoardModel();
        this.boards.push(board.serialize());
    }
}
