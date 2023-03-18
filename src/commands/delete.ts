import inquirer from 'inquirer';
import chalk from 'chalk'

import { DATA } from '../app.js'
import { Book } from '../Book.js'

export async function delete_command(bookName: string, key: string): Promise<boolean> {
    if (!(DATA.containBook(bookName))) {
        console.log(chalk.redBright(`The ${bookName} book does not exist`))
        return false
    }

    let book: Book = DATA.getBook(bookName);

    if (book.isEmpty()) {
        console.log(chalk.redBright(`The ${bookName} book is empty`))
        return false
    }

    let answers
    if (key == undefined) {
        let keys: string[] = book.getKeys()

        answers = await inquirer.prompt({
            name: 'key',
            type: 'list',
            message: 'Command to delete : ',
            choices: keys
        });
        
        key = answers.key;
    }

    book.deleteMemo(key);
    DATA.saveChange()
    return true;
}

export function delete_book(bookName: string): boolean {
    if (!(DATA.containBook(bookName))) {
        console.log(chalk.redBright(`The ${bookName} book does not exist`))
        return false
    }

    DATA.deleteBook(bookName);
    console.log(chalk.greenBright(`The ${bookName} book is now deleted`))
    return true;
}