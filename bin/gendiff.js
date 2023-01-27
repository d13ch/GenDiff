#!/usr/bin/env node

import { Command } from 'commander';
import makeDiff from '../src/formatters/formatter.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.2', '-v, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => console.log(makeDiff(
    filepath1,
    filepath2,
    program.opts().format,
  )))
  .parse();
