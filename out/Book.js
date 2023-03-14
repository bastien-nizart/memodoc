import { Memo } from './Memo.js';
export class Book {
    constructor(name) {
        this.name = name;
        this.memos = [];
    }
    addMemo(memo) {
        this.memos.push(memo);
    }
    getName() {
        return this.name;
    }
    isEmpty() {
        return this.memos.length == 0;
    }
    getMemos() {
        return this.memos;
    }
    containMemo(key) {
        for (let memo of this.memos) {
            if (key == memo.getKey()) {
                return true;
            }
        }
        return false;
    }
    getMemo(key) {
        for (let memo of this.memos) {
            if (key == memo.getKey()) {
                return memo;
            }
        }
        return new Memo('', '');
    }
    getKeys() {
        let keys = [];
        for (let memo of this.memos) {
            keys.push(memo.getKey());
        }
        return keys;
    }
    deleteMemo(key) {
        if (!(this.containMemo(key))) {
            return false;
        }
        this.memos = this.memos.filter((memo) => memo.getKey() !== key);
        return true;
    }
}
