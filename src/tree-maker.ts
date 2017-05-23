import * as assert from 'assert';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as path from 'path';

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
    children: TreeMaker[];
    stat: fs.Stats;
}

export interface ITree {
    [ index: string ]: ITree[];
}

export class TreeMaker {

    private static getFile(pathName: string): IFile {
        let stat: fs.Stats;

        try {
            stat = fs.statSync(pathName);
        } catch (e) {
            console.error(e.message); // tslint:disable-line no-console
            throw (e);
        }

        const name = path.basename(pathName);

        return {
            children: [],
            name,
            path: pathName,
            stat
        };
    }

    private static getChildren(parentFile: IFile): TreeMaker[] {
        if (!parentFile.stat.isDirectory()) return [];

        let childrenFileNames: string[] = fs.readdirSync(parentFile.path);
        childrenFileNames = childrenFileNames.map(name => path.resolve(parentFile.path, name));

        return childrenFileNames.map(name => new TreeMaker(name));
    }

    public entry: IFile;

    constructor(public entryPath: string) {
        assert.ok(!_.isEmpty(entryPath), 'TreeMaker expect a non empty string.');

        const entry: IFile = TreeMaker.getFile(entryPath);
        entry.children = TreeMaker.getChildren(entry);
        this.entry = entry;
    }

    public getTree(): ITree {
        const tree: ITree = {};
        const name: string = this.entry.name;

        const children: TreeMaker[] = this.entry.children;

        tree[name] = _.isEmpty(children) ? [] : children.map(child => child.getTree());
        return tree;
    }
}
