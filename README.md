# MemoDOC
Small cli program for memorizing and outputting specific commands very quickly.

## Installation

```bash
npm install memodoc -g
```

## Description

This small cli program is designed for developers in study or who have just arrived in a company.
The idea came to me in the second year of studying computer science. During an Angular pratique work.
I was wasting a lot of time looking for the exact syntax of the "ns" utility commands.

With this small program you can find with a small command your most complex syntaxes quickly.
The add of command is also done very quickly.

![presentation](https://thumbmail.nizart.me/projects/memodoc/presentation.gif)

## Usage

```
memodoc --help
```

```
MemoDOC is a small cli program for memorizing and outputting specific commands
very quickly. No more scrolling for hours in the documentation.

Usage
  $ memodoc
Options:
  -v, --version           output the current version
  -h, --help              display help for command

Commands:
  all | a                 List all command saved in memo-cli
  book | b <name>         Show content of a specific book
  put | p <book> [key]    Put command in specific book
  copy | cp <book> [key]  Copy specific command in your clipboard
  reset                   Reset all data stored in this app
  help [command]          display help for command
```

