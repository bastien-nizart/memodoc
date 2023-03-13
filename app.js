#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk'
import fs from 'fs';

import { DATA_PATH, DATA } from './lib/data.js'
import { delete_command } from './lib/commands/delete.js'
import { reset } from './lib/commands/reset.js'
import { book } from './lib/commands/book.js'
import { copy } from './lib/commands/copy.js'
import { all } from './lib/commands/all.js'
import { put } from './lib/commands/put.js'

const program = new Command();
const VERSION = "0.5.8"
const DESCRIPTION = "MemoDOC is a small cli program for memorizing and outputting specific commands very quickly. No more scrolling for hours in the documentation"

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
    .action(function (name) {book(name)});

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