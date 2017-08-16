import * as Debug from 'debug';
import { fs } from 'mz';
import { basename, extname, join } from 'path';

const debug = Debug('dir-manager');

export enum FileType {
  File      = 'file',
  Directory = 'directory'
}

export interface ITree {
  path: string;
  name: string;
  size ?: number;
  extension ?: string;
  type: FileType;
  children ?: ITree[];
}

export default class Tree implements ITree {

  constructor(public path: string) {
  }

  public get json(): ITree {
    return {
      path:      this.path,
      name:      this.name,
      size:      this.size,
      extension: this.extension,
      type:      this.type,
      children:  this.children
    };
  }

  public get name(): string {
    return basename(this.path);
  }

  public get size(): number {
    return this.stat.size;
  }

  public get extension(): string {
    return extname(this.path).toLowerCase();
  }

  public get type(): FileType {
    return this.stat.isDirectory() ? FileType.Directory : FileType.File;
  }

  public get children(): ITree[] {
    if (this.stat.isDirectory()) {
      const children = this.dir;

      return children.map(child => new Tree(join(this.path, child)).json);
    }

    return [];
  }

  public get stat(): fs.Stats {
    return fs.statSync(this.path);
  }

  private get dir(): string[] {
    return fs.readdirSync(this.path);
  }

}
