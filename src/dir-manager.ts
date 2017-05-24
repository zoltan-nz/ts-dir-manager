import * as assert from 'assert';
import * as path from 'path';
import * as process from 'process';
import { Tree } from './tree';
import Debug = require('debug');
import * as chalk from 'chalk';

const debug = Debug('dir-manager');

debug('ARGV:', process.argv);
debug('__dirname:', __dirname);
debug('process.pwd', process.cwd());

(() => {
  try {

    const mainDirectory = process.argv[2];
    assert.ok(mainDirectory, 'Please provide a directory path as first param.');

    const pwd = process.cwd();

    const resolvedDirectory = path.resolve(pwd, mainDirectory);

    debug('resolvedDirectory', resolvedDirectory);

    const treeMaker = new Tree(resolvedDirectory);
    const tree = treeMaker.getTree();

    console.log(JSON.stringify(tree, null, 2)); // tslint:disable-line no-console
  } catch (e) {
    console.error(chalk.red(e.message)); // tslint:disable-line no-console
  }
})();
