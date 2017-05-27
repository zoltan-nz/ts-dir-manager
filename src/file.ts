import * as assert from 'assert';
import * as chalk from 'chalk';
import { ENOENT } from 'constants';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import { Tree } from './tree';
import Debug = require('debug');

const debug = Debug('dir-manager');

export enum FileType {
  File,
  Directory,
  SymLink
}

export interface IFile {
  path: string;
  name: string;
  ext?: string;
  type?: FileType;
  content?: string;
  children: Tree[];
  stat: fs.Stats | false;
}

export default class File implements IFile {

  public path: string;
  public name: string;
  public ext?: string;
  public type?: FileType;
  public content?: string;
  public children: Tree[];
  public stat: fs.Stats | false;

  constructor(absolutePath: string) {
    assert.ok(!_.isEmpty(absolutePath), 'TreeMaker expect a non empty string.');

    try {
      this.stat = fs.statSync(absolutePath);
    } catch (e) {
      debug(chalk.red(e.message));
      if (e.code === 'ELOOP')
        debug(chalk.red('There is an infinite loop symlink in your directory ' +
          'structure, please fix it!'));
      if (e.code === 'ENOENT')
        debug(chalk.red('This symlink is probably broken: '), absolutePath);

      this.stat = false;
    }

    this.children = [];
    this.name = path.basename(absolutePath);
    this.path = absolutePath;

    return this;
  }

  public toString() {
    return this.name;
  }
}
