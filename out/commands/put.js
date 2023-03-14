var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import chalk from 'chalk';
import { DATA } from '../app.js';
import { Book } from '../Book.js';
import { Memo } from '../Memo.js';
export function put(bookName, key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(DATA.containBook(bookName))) {
            DATA.addBook(new Book(bookName));
            console.log(chalk.greenBright(`Successfully created book`));
        }
        const book = DATA.getBook(bookName);
        let answers;
        let command;
        if (key == undefined) {
            answers = yield inquirer.prompt({
                name: 'key',
                type: 'input',
                message: 'ID of the command : ',
            });
            key = answers.key;
        }
        answers = yield inquirer.prompt({
            name: 'command',
            type: 'input',
            message: 'Command : ',
        });
        command = answers.command;
        book.addMemo(new Memo(key, command));
        DATA.saveChange();
        return true;
    });
}
