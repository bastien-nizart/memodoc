import fs from 'fs'
import chalk from 'chalk';

import { Book } from './Book.js'
import { Memo } from './Memo.js'

export class Collection {
    private data: Book[];
    private DATA_PATH: string;

    constructor(data_path: string) {
        this.DATA_PATH = data_path
        this.data = [];
        this.init();
    }

    private init(): void {
        try {
            const dataJson = JSON.parse(fs.readFileSync(this.DATA_PATH, 'utf8'));
            for (let bookContent of dataJson) {
                let book: Book = new Book(bookContent['name'])
    
                for (var memoContent of bookContent['memos']) {
                    book.addMemo(new Memo(memoContent['key'], memoContent['command']))
                }
                this.data.push(book)
            }
        } catch (e) {
            fs.writeFileSync(this.DATA_PATH, "[]")
            console.log(chalk.redBright('your data has been corrupted app storage has been reset'))
        }
    }

    public addBook(book: Book): void {
        this.data.push(book)
        this.saveChange()
    }

    public deleteBook(bookName: string): boolean {
        if (!(this.containBook(bookName))) {
            return false;
        }

        this.data = this.data.filter((book) => book.getName() !== bookName)
        this.saveChange()
        return true;
    }

    public isEmpty(): boolean {
        return this.data.length == 0;
    }

    public getBooks(): Book[] {
        return this.data;
    }

    public containBook(bookName: string): boolean {
        for(let book of this.data) {
            if (bookName == book.getName()) {
                return true;
            }
        }

        return false;
    }

    public getBook(bookName: string): Book {
        for(let book of this.data) {
            if (bookName == book.getName()) {
                return book;
            }
        }

        return new Book('');
    }

    public saveChange() {
        fs.writeFileSync(this.DATA_PATH, JSON.stringify(this.data))
    }
}