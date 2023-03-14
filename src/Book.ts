import { Memo } from './Memo.js'
import { DATA } from './app.js'

export class Book {
    private name: string;
    private memos: Memo[];

    constructor(name: string) {
        this.name = name;
        this.memos = []
    }

    public addMemo(memo: Memo): void {
        this.memos.push(memo);
    }

    public getName(): string {
        return this.name;
    }

    public isEmpty(): boolean {
        return this.memos.length == 0;
    }

    public getMemos(): Memo[] {
        return this.memos;
    }

    public containMemo(key: string): boolean {
        for(let memo of this.memos) {
            if (key == memo.getKey()) {
                return true;
            }
        }

        return false;
    }

    public getMemo(key: string): Memo {
        for(let memo of this.memos) {
            if (key == memo.getKey()) {
                return memo;
            }
        }

        return new Memo('', '');
    }

    public getKeys(): string[] {
        let keys: string[] = [];
        for(let memo of this.memos) {
            keys.push(memo.getKey())
        }

        return keys;
    }

    public deleteMemo(key: string): boolean {
        if (!(this.containMemo(key))) {
            return false;
        }

        this.memos = this.memos.filter((memo) => memo.getKey() !== key)
        return true;
    }
}