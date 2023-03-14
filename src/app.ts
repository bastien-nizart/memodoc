#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import { Command } from 'commander';

import { delete_command } from './commands/delete.js'
import { reset } from './commands/reset.js'
import { add_book } from './commands/book.js'
import { copy } from './commands/copy.js'
import { all } from './commands/all.js'
import { put } from './commands/put.js'

import { Collection } from './Collection.js'

const program: Command = new Command();
const VERSION: string = "1.0.0"
const DESCRIPTION: string = "MemoDOC is a small cli program for memorizing and outputting specific commands very quickly. No more scrolling for hours in the documentation"

const APP_DIR: string = os.homedir() + '/.memodoc'
export const DATA_PATH: string = APP_DIR + '/data.json'

try { 
    fs.mkdirSync(APP_DIR); 
} catch(e: any) { 
    if (e.code != 'EEXIST') throw e;
}

// Create required json file if it's not
if (!(fs.existsSync(DATA_PATH))) {
    fs.writeFileSync(DATA_PATH, "[]");
}

export const DATA: Collection = new Collection(DATA_PATH);

program
  .name('memodoc')
  .description(DESCRIPTION)
  .version(VERSION, '-v, --version', 'output the current version');

program.command('all')
    .alias('a')
    .description('List all command saved in memo-cli')
    .action(function() {all()})

program.command('book <name>')
    .alias('b')
    .description('Show content of a specific book. If this book does not exist, it will be created')
    .action(function (name) {add_book(name)});

program.command('put <book> [key]')
    .alias('p')
    .description('Put command in specific book. If this book does not exist, it will be created')
    .action(function (book, key) {put(book, key)});

program.command('copy <book> [key]')
    .alias('cp')
    .description('Copy specific command in your clipboard')
    .action(function (book, key) {copy(book, key)});

program.command('delete <book> [key]')
    .alias('del')
    .description('Delete specific command')
    .action(function (book, key) {delete_command(book, key)});

 program.command('reset')
    .description('Reset all data stored in this app')
    .action(function() { reset() });

program.parse(process.argv);
