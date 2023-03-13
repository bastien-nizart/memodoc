import inquirer from 'inquirer';
import chalk from 'chalk'
import fs from 'fs';
import { DATA, DATA_PATH } from '../data.js'

function get_all_key(book) {
    if (!(book in DATA)) {
        return false
    }
    
    let keys = []
    Object.entries(DATA[book]).forEach(function([id, content]) {
        keys.push(id);
    });

    return keys
}

export async function delete_command(book, key) {
    if (!(book in DATA)) {
        console.log(chalk.redBright(`The ${book} book does not exist`))
        return false
    }

    if (Object.keys(DATA[book]).length === 0) {
        console.log(chalk.redBright(`The ${book} book is empty`))
        return false
    }

    let answers
    if (key == undefined) {
        let keys = get_all_key(book)
        if (!keys) {
            console.log(chalk.redBright(`The ${book} book does not exist`))
            return false
        }

        answers = await inquirer.prompt({
            name: 'key',
            type: 'list',
            message: 'Command to delete : ',
            choices: keys
        });
        
        key = answers.key;
    }

    delete DATA[book][key]
    fs.writeFileSync(DATA_PATH, JSON.stringify(DATA))
}