import * as assert from 'assert';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import File, { IFile } from './file';

export interface ITree {
  [ index: string ]: ITree[] | string;
}

export class Tree  {

  constructor(public entry: IFile) {}

  public buildTree(): ITree {
    const tree: ITree = {};
    const name: string = this.entry.name;

    const children: IFile[] = this.entry.children;

    tree[name] = _.isEmpty(children) ? '' : children.map(child => new Tree(child).buildTree());
    return tree;
  }
}
