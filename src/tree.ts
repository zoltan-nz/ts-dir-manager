import { chalk } from 'chalk';
import { ENOENT } from 'constants';
import * as Debug from 'debug';
import * as klawSync from 'klaw-sync';
import * as _ from 'lodash';
import { fs } from 'mz';
import * as path from 'path';

const debug = Debug('dir-manager');

export enum FileType {
  File      = 'file',
  Directory = 'directory'
}

export interface ITree {
  name: string;
  type: FileType;
  children?: ITree;
}

export class Tree {

  constructor(public absolutePath: string) {
  }

  public get jsonTree(): string {
    return JSON.stringify(this.tree);
  }

  private get walkList() {
    return klawSync(this.absolutePath);
  }

  public get tree(): ITree {

    const tree: ITree = {
      name: this.name,
      type: FileType.Directory
    };

    const type = this.stats;
    const children: ITree[] = this.getChildrenSync(this.absolutePath);

    if (_.isEmpty(children)) {
      tree[name] = '';
    } else {
      const branch: ITree[] = children.map(child => buildTreeSync(child));
      tree[name] = branch;
    }
    return tree;
  }

  private get name() {
    return path.basename(this.absolutePath);
  }

  private get childrenSync(): ITree[] {

    let childrenFileNames: string[];
    if (!this.stats || !this.stats.isDirectory()) return [];

    try {
      childrenFileNames = fs.readdirSync(this.absolutePath);
    } catch (e) {
      debug(chalk.red('Cannot read directory'), e.code, absolutePath);
      childrenFileNames = [];
    }

    return childrenFileNames.map(name => path.resolve(absolutePath, name));
  }

  private get stats(): fs.Stats {
    let stat: fs.Stats;
    try {
      stat = fs.statSync(this.absolutePath);
    } catch (e) {
      debug(chalk.red(e.message);

      if (e.code === 'ELOOP')
        debug(chalk.red('There is an infinite loop symlink in your directory ' +
          'structure, please fix it!'));
      if (e.code === 'ENOENT')
        debug(chalk.red('This symlink is probably broken: '), this.absolutePath);
    }
    return stat;
  }
}
