export class Memo {
    private key: string;
    private command: string;
    private description: string;

    constructor(key: string, command: string) {
        this.key = key;
        this.command = command;
        this.description = ''; // useless for the moment
    }

    public getCommand(): string {
        return this.command;
    }


    public getKey(): string {
        return this.key;
    }
}