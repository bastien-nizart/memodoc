export class Memo {
    constructor(key, command) {
        this.key = key;
        this.command = command;
        this.description = ''; // useless for the moment
    }
    getCommand() {
        return this.command;
    }
    getKey() {
        return this.key;
    }
}
