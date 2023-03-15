import fs from 'fs';
import chalk from 'chalk';
import { Book } from './Book.js';
import { Memo } from './Memo.js';
export class Collection {
    constructor(data_path) {
        this.DATA_PATH = data_path;
        this.data = [];
        this.init();
    }
    init() {
        try {
            const dataJson = JSON.parse(fs.readFileSync(this.DATA_PATH, 'utf8'));
            for (let bookContent of dataJson) {
                let book = new Book(bookContent['name']);
                for (var memoContent of bookContent['memos']) {
                    book.addMemo(new Memo(memoContent['key'], memoContent['command']));
                }
                this.data.push(book);
            }
        }
        catch (e) {
            fs.writeFileSync(this.DATA_PATH, "[]");
            console.log(chalk.redBright('your data has been corrupted app storage has been reset'));
        }
    }
    addBook(book) {
        this.data.push(book);
        this.saveChange();
    }
    deleteBook(bookName) {
        if (!(this.containBook(bookName))) {
            return false;
        }
        this.data = this.data.filter((book) => book.getName() !== bookName);
        this.saveChange();
        return true;
    }
    isEmpty() {
        return this.data.length == 0;
    }
    getBooks() {
        return this.data;
    }
    containBook(bookName) {
        for (let book of this.data) {
            if (bookName == book.getName()) {
                return true;
            }
        }
        return false;
    }
    getBook(bookName) {
        for (let book of this.data) {
            if (bookName == book.getName()) {
                return book;
            }
        }
        return new Book('');
    }
    saveChange() {
        fs.writeFileSync(this.DATA_PATH, JSON.stringify(this.data));
    }
}
