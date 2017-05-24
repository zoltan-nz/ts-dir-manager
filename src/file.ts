import * as assert from 'assert';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import { Tree } from './tree';

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
  stat: fs.Stats;
}

export default class File implements IFile {

  public path: string;
  public name: string;
  public ext?: string;
  public type?: FileType;
  public content?: string;
  public children: Tree[];
  public stat: fs.Stats;

  constructor(absolutePath: string) {
    assert.ok(!_.isEmpty(absolutePath), 'TreeMaker expect a non empty string.');

    try {
      this.stat = fs.statSync(absolutePath);
    } catch (e) {
      console.error(e.message); // tslint:disable-line no-console
      throw (e);
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
