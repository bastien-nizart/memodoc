#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import { Command } from 'commander';
import { delete_command, delete_book } from './commands/delete.js';
import { add_book } from './commands/book.js';
import { reset } from './commands/reset.js';
import { copy } from './commands/copy.js';
import { all } from './commands/all.js';
import { put } from './commands/put.js';
import { Collection } from './Collection.js';
const program = new Command();
const VERSION = "1.0.1";
const DESCRIPTION = "MemoDOC is a small cli program for memorizing and outputting specific commands very quickly. No more scrolling for hours in the documentation";
const APP_DIR = os.homedir() + '/.memodoc';
export const DATA_PATH = APP_DIR + '/data.json';
try {
    fs.mkdirSync(APP_DIR);
}
catch (e) {
    if (e.code != 'EEXIST')
        throw e;
}
// Create required json file if it's not
if (!(fs.existsSync(DATA_PATH))) {
    fs.writeFileSync(DATA_PATH, "[]");
}
export const DATA = new Collection(DATA_PATH);
program
    .name('memodoc')
    .description(DESCRIPTION)
    .version(VERSION, '-v, --version', 'output the current version');
program.command('a')
    .alias('all')
    .description('List all command saved in memo-cli')
    .action(function () { all(); });
program.command('b <name>')
    .alias('book')
    .description('Show content of a specific book. If this book does not exist, it will be created')
    .action(function (name) { add_book(name); });
program.command('p <book> [key]')
    .alias('put')
    .description('Put command in specific book. If this book does not exist, it will be created')
    .action(function (book, key) { put(book, key); });
program.command('cp <book> [key]')
    .alias('copy')
    .description('Copy specific command in your clipboard')
    .action(function (book, key) { copy(book, key); });
program.command('d <book> [key]')
    .alias('delete')
    .option('-b, --book', 'Force delete book and all content', false)
    .description('Delete specific command or complete book')
    .action(function (book, key, options) {
    if (options.book) {
        delete_book(book);
    }
    else {
        delete_command(book, key);
    }
});
program.command('reset')
    .description('Reset all data stored in this app')
    .action(function () { reset(); });
program.parse(process.argv);
