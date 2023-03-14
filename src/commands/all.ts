import chalk from 'chalk'

import { DATA } from '../app.js'

export function all(): boolean {
    if (DATA.isEmpty()) {
        console.log(chalk.redBright(`No commands stored here`));
        return false;
    }

    for(let book of DATA.getBooks()) {
        console.log(chalk.blueBright(book.getName() + ' : '))

        if (book.isEmpty()) {
            console.log(chalk.grey('empty'))
        } 
        
        for(let memo of book.getMemos()) {
            console.log(`${memo.getKey()} -> ${chalk.bold(memo.getCommand())}`);
        }

        console.log();
    }

    return true;
}
