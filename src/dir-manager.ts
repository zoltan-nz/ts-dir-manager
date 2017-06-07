import * as assert from 'assert';
import * as path from 'path';
import * as process from 'process';
import { buildTree } from './tree';
import Debug = require('debug');
import * as chalk from 'chalk';
import * as _ from 'lodash';

const debug = Debug('dir-manager');

debug('ARGV:', process.argv);
debug('__dirname:', __dirname);
debug('process.pwd', process.cwd());

(async () => {
  try {

    const mainDirectory = process.argv[2];
    assert.ok(mainDirectory, 'Please provide a directory path as first param.');

    const pwd = process.cwd();

    const resolvedDirectory = path.resolve(pwd, mainDirectory);

    debug('resolvedDirectory', resolvedDirectory);

    const tree = await buildTree(resolvedDirectory);

    console.log(JSON.stringify(tree, null, 2)); // tslint:disable-line no-console
  } catch (e) {
    console.error(chalk.red(e.message)); // tslint:disable-line no-console
  }
})();
