#!/usr/bin/env node

import { Command } from 'commander';
import makeDiff from '../src/index.js';
import chooseFormat from '../src/formatting.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => console.log(makeDiff(
    filepath1,
    filepath2,
    chooseFormat(program.opts().format, filepath1),
  )))
  .parse();
