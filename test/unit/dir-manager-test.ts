import {expect} from 'chai';

import * as path from 'path';

import { TreeMaker } from '../../src/dir-manager';

const FIXTURE_DIRECTORY = '../fixtures/fixture-directory';

describe('TreeMaker', () => {

    it ('new - should create an instance', () => {
        const treeMaker = new TreeMaker();

        expect(treeMaker).is.instanceof(TreeMaker);
    });

    // it('#lsDir - should return directory tree as an Object', () => {
    //     const directory = path.resolve(process.cwd(), FIXTURE_DIRECTORY);
    //
    //     const expectedObject = {
    //         'fixture-directory': {
    //             'dir-1': {
    //                 'dir-1-dir-2': {
    //                     'file-2.txt': true
    //                 },
    //                 'file-3.txt': true
    //             },
    //             'file-1.txt': true
    //         }
    //     };
    //
    //     expect(1).is.equal(1);
    // });
});
