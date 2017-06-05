import * as assert from 'assert';
import * as chalk from 'chalk';
import { ENOENT } from 'constants';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import Debug = require('debug');
import { Stats } from 'fs';

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
  stat: Promise<fs.Stats | false>;
  size(): Promise<number>;
}

export default class File implements IFile {

  public path: string;
  public name: string;
  public ext?: string;
  public type?: FileType;
  public content?: string;
  public isValid: boolean;

  private _stat: Promise<fs.Stats | false>;
  private _children: File[];

  private _isStatUpdated: boolean;
  private _isChildrenUpdated: boolean;

  constructor(absolutePath: string) {
    assert.ok(!_.isEmpty(absolutePath), 'File expect a non empty string.');

    this._isChildrenUpdated = false;
    this._isStatUpdated = false;
    this.isValid = false;
    this.name = path.basename(absolutePath);
    this.path = absolutePath;

    return this;
  }

  public get stat(): Promise<fs.Stats | false> {
    if (this._isStatUpdated) return this._stat;
    return this._updateStat();
  }

  public set stat(value: Promise<fs.Stats | false>) {
    this._stat = value;
  }

  public async getChildren(): Promise<File[]> {
    if (this._isChildrenUpdated) return this._children;
    await this._updateChildren();
    return this._children;
  }

  public setChildren(value: File[]) {
    this._children = value;
  }

  public toString() {
    return this.name;
  }

  public async size(): Promise<number> {
    const children = await this.getChildren();
    return children.length;
  }

  private async _updateStat(): Promise<fs.Stats | false> {
    try {
      this._stat = fs.stat(this.path);
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
      this._stat = Promise.reject(false);
      this.isValid = false;
    }
    return this._stat;
  }

  private async _updateChildren() {
    if (await !this._hasChildren()) return this.setChildren([]);

    const childrenFileNames: string[] = await fs.readdir(this.path);
    const childrenRelativePaths: string[] = childrenFileNames.map(name => path.resolve(this.path, name));

    const childrenMap = childrenRelativePaths.map(childRelativePath => new File(childRelativePath));
    this.setChildren(childrenMap);
    this._isChildrenUpdated = true;
    return childrenMap;
  }

  private async _hasChildren() {
    const stat = await this.stat;
    return !!(stat && stat.isDirectory());
  }
}
