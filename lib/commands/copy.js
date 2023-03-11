import clipboard from 'clipboardy';
import inquirer from 'inquirer';
import chalk from 'chalk'
import fs from 'fs';

import { DATA } from '../data.js'

export async function copy(book, key) {
    if (!(book in DATA)) {
        console.log(chalk.redBright("This book doesn't exist"))
        return false
    }

    let answers
    if (key == undefined) {
        answers = await inquirer.prompt({
            name: 'key',
            type: 'input',
            message: 'ID of the command : ',
        });
        
        key = answers.key;
    }

    if (!(key in DATA[book])) {
        console.log(chalk.redBright("This key doesn't exist in this book"))
        return false
    }

    clipboard.writeSync(DATA[book][key]['command'])
    console.log(chalk.greenBright('"' + DATA[book][key]['command'] + '" copied !'))
}