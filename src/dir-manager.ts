import * as path from 'path';
import * as process from 'process';
import Debug = require('debug');

const debug = Debug('dir-manager');

debug('ARGV:', process.argv);
debug('__dirname:', __dirname);
debug('process.pwd', process.cwd());

export enum FileType {
    File,
    Directory,
    SymLink
}

export interface IFile {
    name: string;
    ext: string;
    type: FileType;
    content: string;
    children: IFile[];
}

export interface ITree {
    [ index: string ]: IFile | ITree;
}

export class TreeMaker {

    public getTree(): ITree {
        return {
            fixtures: {
                'dir-1': {}
            }
        };
    }
}

// (async () => {
//     const mainDirectory = process.argv[2];
//     const pwd = process.cwd();
//
//     const resolvedDirectory = path.resolve(pwd, mainDirectory);
//
//     debug('resolvedDirectory', resolvedDirectory);
//
//     const treeMaker = new TreeMaker(resolvedDirectory);
//     const tree = await treeMaker.getTree();
//
//     console.log(JSON.stringify(tree), null, 2); // tslint:disable-line no-console
// })();
