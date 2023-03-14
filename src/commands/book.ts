import inquirer from 'inquirer';
import chalk from 'chalk'

import { DATA } from '../app.js'
import { Book } from '../Book.js'

export function add_book(name: string): boolean {
    if (!(DATA.containBook(name))) {
        console.log(chalk.redBright(`The ${name} book does not exist`))
        inquirer
            .prompt([
            {
                name: "create_book",
                type: "confirm",
                message: "Do you want to create it?",
                default: "false"
            },
            ])
            .then((answer) => {
                if (answer.create_book) {
                    DATA.addBook(new Book(name))
                }
            });
        return false
    }

    let book: Book = DATA.getBook(name)
    
    console.log(chalk.blueBright(name + ' : '))

    if (book.isEmpty()) {
        console.log(chalk.grey('empty'))
    } 

    for(let memo of book.getMemos()) {
        console.log(`${memo['key']} -> ${chalk.bold(memo['command'])}`);
    }

    return true;
}