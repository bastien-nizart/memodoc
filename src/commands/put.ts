import inquirer from 'inquirer';
import chalk from 'chalk'

import { DATA } from '../app.js'
import { Book } from '../Book.js'
import { Memo } from '../Memo.js'

export async function put(bookName: string, key: string): Promise<boolean> {
    if (!(DATA.containBook(bookName))) {
        DATA.addBook(new Book(bookName))
        console.log(chalk.greenBright(`Successfully created book`))
    }

    const book: Book = DATA.getBook(bookName);
    let answers
    let command

    if (key == undefined) {
        answers = await inquirer.prompt({
            name: 'key',
            type: 'input',
            message: 'ID of the command : ',
        });
        
        key = answers.key;
    }

    answers = await inquirer.prompt({
        name: 'command',
        type: 'input',
        message: 'Command : ',
    });
    
    command = answers.command;

    book.addMemo(new Memo(key, command))
    DATA.saveChange()
    return true;
}