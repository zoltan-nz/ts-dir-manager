import * as chalk from 'chalk';
import { ENOENT } from 'constants';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import Debug = require('debug');
const debug = Debug('dir-manager');

export interface ITree {
  [ index: string ]: ITree[] | string;
}

export function buildTreeSync(absolutePath: string): ITree {

  const tree: ITree = {};

  const name = getName(absolutePath);
  const children: string[] = getChildrenSync(absolutePath);

  if (_.isEmpty(children)) {
    tree[name] = '';
  } else {
    const branch: ITree[] = children.map(child => buildTreeSync(child));
    tree[name] = branch;
  }
  return tree;
}

export function getName(absolutePath: string) {
  return path.basename(absolutePath);
}

export function getChildrenSync(absolutePath: string): string[] {

  const stat = getStatsSync(absolutePath);

  let childrenFileNames: string[];
  if (!stat || !stat.isDirectory()) return [];

  try {
    childrenFileNames = fs.readdirSync(absolutePath);
  } catch (e) {
    debug(chalk.red('Cannot read directory'), e.code, absolutePath);
    childrenFileNames = [];
  }

  return childrenFileNames.map(name => path.resolve(absolutePath, name));
}

export function getStatsSync(filePath: string): fs.Stats | false {
  let stat: fs.Stats | false;
  try {
    stat = fs.statSync(filePath);
  } catch (e) {
    debug(chalk.red(e.message));
    if (e.code === 'ELOOP')
      debug(chalk.red('There is an infinite loop symlink in your directory ' +
        'structure, please fix it!'));
    if (e.code === 'ENOENT')
      debug(chalk.red('This symlink is probably broken: '), filePath);
    stat = false;
  }
  return stat;
}
