import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import { DATA_PATH } from '../data.js'

export function reset() {
    inquirer.prompt({
        name: 'reset',
        type: 'confirm',
        message: 'Do you really want to delete all your data?',
    }).then((answers) => {
        if (answers.reset) {
            fs.writeFileSync(DATA_PATH, "{}")
            console.log(chalk.redBright('Your data has been properly deleted'))
        }
    })
}