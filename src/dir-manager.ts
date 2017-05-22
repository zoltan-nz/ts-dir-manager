import * as process from 'process';
import Debug = require('debug');

const debug = Debug('dir-manager');

debug('ARGV:', process.argv);
debug('__dirname:', __dirname);
debug('process.pwd', process.cwd());

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
