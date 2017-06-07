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

export async function buildTree(absolutePath: string): Promise<ITree> {

  const tree: ITree = {};

  const name = getName(absolutePath);
  const children: string[] = await getChildren(absolutePath);

  if (_.isEmpty(children)) {
    tree[name] = '';
  } else {
    const branch: Array<Promise<ITree>> = children.map(child => buildTree(child));
    tree[name] = await Promise.all(branch);
  }
  return tree;
}

export function getName(absoluthPath: string) {
  return path.basename(absoluthPath);
}

export async function getChildren(absolutePath: string): Promise<string[]> {

  const stat = await getStats(absolutePath);

  let childrenFileNames: string[];
  if (!stat || !stat.isDirectory()) return [];

  try {
    childrenFileNames = await fs.readdir(absolutePath);
  } catch (e) {
    debug(chalk.red('Cannot read directory'), e.code, absolutePath);
    childrenFileNames = [];
  }

  return childrenFileNames.map(name => path.resolve(absolutePath, name));
}

export async function getStats(filePath: string): Promise<fs.Stats | false> {
  let stat: fs.Stats | false;
  try {
    stat = await fs.stat(filePath);
  } catch (e) {
    debug(chalk.red(e.message));
    if (e.code === 'ELOOP')
      debug(chalk.red('There is an infinite loop symlink in your directory ' +
        'structure, please fix it!'));
    if (e.code === 'ENOENT')
      debug(chalk.red('This symlink is probably broken: '), filePath);
    stat = await false;
  }
  return stat;
}
