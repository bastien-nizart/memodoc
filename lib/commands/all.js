import inquirer from 'inquirer';
import chalk from 'chalk'
import { DATA } from '../data.js'

export function all() {
    if (Object.keys(DATA).length === 0) {
        console.log(chalk.redBright(`No commands stored here`))
        return false
    }

    Object.entries(DATA).forEach(function([book, content]) {
        console.log(chalk.blueBright(book + ' : '))

        if (Object.keys(content).length === 0) {
            console.log(chalk.grey('empty'))
        } else {
            Object.entries(content).forEach(function([id, contentCommand]) {
                console.log(`${id} -> ${chalk.bold(contentCommand['command'])}`);
            })
        }

        console.log();
    });
}
