import * as assert from 'assert';
import * as chalk from 'chalk';
import { ENOENT } from 'constants';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
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
  children: IFile[];
  stat: fs.Stats | false;
  size(): number;
}

export default class File implements IFile {
  public path: string;
  public name: string;
  public ext?: string;
  public type?: FileType;
  public content?: string;
  public isValid: boolean;

  private _stat: fs.Stats | false;
  private _children: IFile[];

  private _isStatUpdated: boolean;
  private _isChildrenUpdated: boolean;

  constructor(absolutePath: string) {
    assert.ok(!_.isEmpty(absolutePath), 'File expect a non empty string.');

    this._isChildrenUpdated = false;
    this._isStatUpdated = false;
    this.isValid = false;
    this.children = [];
    this.name = path.basename(absolutePath);
    this.path = absolutePath;

    return this;
  }

  public get stat() {
    if (this._isStatUpdated) return this._stat;
    this._updateStat();
    return this._stat;
  }

  public set stat(value: fs.Stats | false) {
    this._stat = value;
  }

  public get children() {
    if (this._isChildrenUpdated) return this._children;
    this._updateChildren();
    return this._children;
  }

  public set children(value: IFile[]) {
    this._children = value;
  }

  public toString() {
    return this.name;
  }

  public size() {
    return this.children.length;
  }

  private _updateStat() {
    try {
      this._stat = fs.statSync(this.path);
      this._isStatUpdated = true;
      this.isValid = true;
    } catch (e) {
      debug(chalk.red(e.message));
      if (e.code === 'ELOOP')
        debug(chalk.red('There is an infinite loop symlink in your directory ' +
          'structure, please fix it!'));
      if (e.code === 'ENOENT')
        debug(chalk.red('This symlink is probably broken: '), this.path);
      this._isStatUpdated = true;
      this._stat = false;
      this.isValid = false;
    }
    return this._stat;
  }

  private _updateChildren() {
    if (this.stat && (!this.isValid || this.stat.isSymbolicLink() || !this.stat.isDirectory()))
      return this.children = [];

    const childrenFileNames: string[] = fs.readdirSync(this.path);
    const childrenRelativePaths: string[] = childrenFileNames.map(name => path.resolve(this.path, name));

    this.children = childrenRelativePaths.map(childRelativePath => new File(childRelativePath));
    this._isChildrenUpdated = true;
    return this.children;
  }
}
