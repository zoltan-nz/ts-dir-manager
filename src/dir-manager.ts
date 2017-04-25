import * as fs from 'async-file';
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

class File implements IFile {

    public children: File[] = [];
    public name: string;
    public ext: string;
    public content: string;
    public type: FileType;
    private ready: Promise<boolean>;

    private stat: fs.Stats;

    constructor(private absoluteFilePath: string) {
        this.ready = new Promise((resolve, reject) => {
            this.setupStat().then(() => {
                    this.name = path.basename(this.absoluteFilePath);
                    this.ext = path.extname(this.absoluteFilePath);
                    this.type = this.getType();

                    if (this.stat.isDirectory()) {
                        this.buildChildren().then(() => {
                            process.stdout.write('yey');
                            resolve(true);
                        });
                    }
                }
            );
        });

    }

    public async getTree(): Promise<{ [index: string]: File[] }> {
        return new Promise((resolve: { [index: string]: File[] }, reject) => {
            this.ready.then(result => {
                console.log('isReadyAfterThen', result);

                const tree: { [index: string]: File[] } = {};
                tree[this.name] = this.children;
                return resolve(tree);
            });
        });
    }

    private async setupStat() {
        await fs.stat(this.absoluteFilePath).then(stat => this.stat = stat);
    }

    private getType() {
        if (this.stat.isDirectory()) return FileType.Directory;
        if (this.stat.isSymbolicLink()) return FileType.SymLink;
        return FileType.File;
    }

    private async buildChildren() {
        const children: string[] = await fs.readdir(this.absoluteFilePath);

        await children.forEach(async child => {
            const childAbsoluteFilePath: string = path.resolve(this.absoluteFilePath, child);
            this.children.push(new File(childAbsoluteFilePath));
        });

        await Promise.all(this.children.map(file => file.ready));
    }
}

(async () => {
    const
        mainDirectory = process.argv[2];
    const
        pwd = process.cwd();

    const
        resolvedDirectory = path.resolve(pwd, mainDirectory);

    debug(
        'resolvedDirectory'
        ,
        resolvedDirectory
    );

    const
        dir = new File(resolvedDirectory);
    const
        tree = await
            dir
                .getTree();

    console
        .log(JSON

                .stringify(tree)

            ,
            null
            ,
            2
        ); // tslint:disable-line no-console
})
();
