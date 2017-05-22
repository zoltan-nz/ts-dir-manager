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
    name?: string;
    ext?: string;
    type?: FileType;
    content?: string;
    children?: IFile[];
    stat: fs.Stats;
}

export interface ITree {
    [ index: string ]: IFile | ITree;
}

export class TreeMaker {

    private static getFile(path: string): IFile {
        let stat: fs.Stats;

        try {
            stat = fs.statSync(path);
        } catch (e) {
            console.error(e.message); // tslint:disable-line no-console
            throw (e);
        }

        return {
            path,
            stat
        };
    }

    private static getChildren(parentFile: IFile): IFile[] {
        if (!parentFile.stat.isDirectory()) { return []; }

        let childrenFileNames: string[] = fs.readdirSync(parentFile.path);
        childrenFileNames = childrenFileNames.map(name => path.resolve(parentFile.path, name));

        return childrenFileNames.map(name => new TreeMaker(name).entry);
    }

    public entry: IFile;

    constructor(public entryPath: string) {
        assert.ok(!_.isEmpty(entryPath), 'TreeMaker expect a non empty string.');

        const entry = TreeMaker.getFile(entryPath);
        entry.children = TreeMaker.getChildren(entry);

        this.entry = entry;
    }

    public getTree(): ITree {
        return {
            fixtures: {
                'dir-1': {}
            }
        };
    }
}
