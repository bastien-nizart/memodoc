import inquirer from 'inquirer';
import chalk from 'chalk'
import { create_book, DATA } from '../data.js'

export function book(name) {
    if (!(name in DATA)) {
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
                    create_book(name)
                }
            });
        return false
    }
    
    console.log(chalk.blueBright(name + ' : '))
    Object.entries(DATA[name]).forEach(function([id, content]) {
        console.log(`${id} -> ${chalk.bold(content['command'])}`);
    });
}