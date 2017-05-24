import * as assert from 'assert';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';
import File, { IFile } from './file';

export interface ITree {
  [ index: string ]: ITree[] | string;
}

export class Tree  {

  private static getChildren(parentFile: IFile): Tree[] {
    if (!parentFile.stat.isDirectory()) return [];

    let childrenFileNames: string[] = fs.readdirSync(parentFile.path);
    childrenFileNames = childrenFileNames.map(name => path.resolve(parentFile.path, name));

    return childrenFileNames.map(name => new Tree(name));
  }

  public entry: IFile;

  constructor(public entryPath: string) {
    assert.ok(!_.isEmpty(entryPath), 'TreeMaker expect a non empty string.');

    const file: IFile = new File(entryPath);
    file.children = Tree.getChildren(file);
    this.entry = file;
  }

  public getTree(): ITree {
    const tree: ITree = {};
    const name: string = this.entry.name;

    const children: Tree[] = this.entry.children;

    tree[name] = _.isEmpty(children) ? '' : children.map(child => child.getTree());
    return tree;
  }
}
