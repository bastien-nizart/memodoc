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
export function delete_command(bookName, key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(DATA.containBook(bookName))) {
            console.log(chalk.redBright(`The ${bookName} book does not exist`));
            return false;
        }
        let book = DATA.getBook(bookName);
        if (book.isEmpty()) {
            console.log(chalk.redBright(`The ${bookName} book is empty`));
            return false;
        }
        let answers;
        if (key == undefined) {
            let keys = book.getKeys();
            answers = yield inquirer.prompt({
                name: 'key',
                type: 'list',
                message: 'Command to delete : ',
                choices: keys
            });
            key = answers.key;
        }
        book.deleteMemo(key);
        DATA.saveChange();
        return true;
    });
}
