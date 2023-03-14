import clipboard from 'clipboardy';
import inquirer from 'inquirer';
import chalk from 'chalk'
import fs from 'fs';

import { DATA } from '../app.js'
import { Book } from '../Book.js'

export async function copy(bookName: string, key: string): Promise<boolean> {
    if (!(DATA.containBook(bookName))) {
        console.log(chalk.redBright("This book doesn't exist"))
        return false
    }

    let book: Book = DATA.getBook(bookName)

    let answers
    if (key == undefined) {
        answers = await inquirer.prompt({
            name: 'key',
            type: 'input',
            message: 'ID of the command : ',
        });
        
        key = answers.key;
    }

    if (!(book.containMemo(key))) {
        console.log(chalk.redBright("This key doesn't exist in this book"))
        return false;
    }

    clipboard.writeSync(book.getMemo(key).getCommand())
    console.log(chalk.greenBright('"' + book.getMemo(key).getCommand() + '" copied !'))
    return true;
}