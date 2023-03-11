import inquirer from 'inquirer';
import chalk from 'chalk'
import { create_book, DATA, DATA_PATH } from '../data.js'
import fs from 'fs';

export async function put(book, key) {
    if (!(book in DATA)) {
        create_book(book)
    }
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
        message: 'Commande : ',
    });
    
    command = answers.command;

    DATA[book][key] = {
        "description": "",
        "command": command
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(DATA))
}