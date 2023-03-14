var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import clipboard from 'clipboardy';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { DATA } from '../app.js';
export function copy(bookName, key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(DATA.containBook(bookName))) {
            console.log(chalk.redBright("This book doesn't exist"));
            return false;
        }
        let book = DATA.getBook(bookName);
        let answers;
        if (key == undefined) {
            answers = yield inquirer.prompt({
                name: 'key',
                type: 'input',
                message: 'ID of the command : ',
            });
            key = answers.key;
        }
        if (!(book.containMemo(key))) {
            console.log(chalk.redBright("This key doesn't exist in this book"));
            return false;
        }
        clipboard.writeSync(book.getMemo(key).getCommand());
        console.log(chalk.greenBright('"' + book.getMemo(key).getCommand() + '" copied !'));
        return true;
    });
}
