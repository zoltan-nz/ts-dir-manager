import * as Debug from 'debug';
import * as klawSync from 'klaw-sync';
import { fs } from 'mz';
import { join } from 'path';

const debug = Debug('dir-manager');

export enum FileType {
  File      = 'file',
  Directory = 'directory'
}

export interface ITree extends klawSync.Item {
  path: string;
  stats: fs.Stats;
  name: string;
  type: FileType;
  children ?: ITree;
}

class Tree implements ITree {

  public path: string;
  public stats: fs.Stats;
  public name: string;
  public type: FileType;
  public childrend ?: ITree;

  constructor(public absolutePath: string) {
  }

  public get jsonTree(): string {
    return JSON.stringify(this.walkList);
  }

  public get walkList(): ReadonlyArray<klawSync.Item> {
    return klawSync(this.absolutePath);
  }

  public walkSync(filePath: string): string | Array<ReadonlyArray<string>> {

    let result: string | Array<ReadonlyArray<string>>;

    result = fs.statSync(filePath).isDirectory()
      ? fs.readdirSync(filePath).map(file => this.walkSync(join(filePath, file)))
      : filePath;
  }
}

export default Tree;
