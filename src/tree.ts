import * as _ from 'lodash';
import File from './file';

export interface ITree {
  [ index: string ]: Array<Promise<ITree>> | string;
}

export class Tree {

  constructor(public entry: File) {
  }

  public async buildTree(): Promise<ITree> {
    const tree: ITree = {};
    const name: string = this.entry.name;

    const children: File[] = await this.entry.getChildren();

    if (_.isEmpty(children)) {
      tree[name] = '';
    } else {
      tree[name] = children.map(async child => {
        const childTree = new Tree(child);
        const childBuiltTree = await childTree.buildTree();
        return childBuiltTree;
      });
    }
    return tree;
  }
}
