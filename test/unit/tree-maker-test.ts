import {expect} from 'chai';

import * as path from 'path';

import {TreeMaker} from '../../src/tree-maker';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('TreeMaker', () => {

    it('new - should create an instance', () => {
        const treeMaker = new TreeMaker(FIXTURE_DIRECTORY);

        expect(treeMaker, 'should create an instance').is.instanceof(TreeMaker);
    });

    it('#getFile - should errors when the file does not exists', () => {
        expect(() => new TreeMaker('not-existing.file'), 'not existing file should throw an ENOENT error').to.throw(/ENOENT/);
        expect(() => new TreeMaker(''), 'empty string as param should throw an assert error').to.throw();
    });

    it('entry - should contain the tree object', () => {
        const treeMaker = new TreeMaker(FIXTURE_DIRECTORY);

        expect(treeMaker.entry).is.not.empty;
    });

    it('entry.children - should contain the children objects', () => {
        const treeMaker = new TreeMaker(FIXTURE_DIRECTORY);
        const dir1Tree = new TreeMaker(`${FIXTURE_DIRECTORY}/dir-1`);
        const file1Tree = new TreeMaker(`${FIXTURE_DIRECTORY}/file-1.txt`);

        expect(treeMaker.entry.children).length(2);
        expect(treeMaker.entry.children).deep.equal([dir1Tree, file1Tree]);
    });

    it('#getTree - should return an Object', () => {
        const treeMaker = new TreeMaker(FIXTURE_DIRECTORY);
        const expected = {
            'fixture-directory': [
                {
                    'dir-1': [
                        {
                            'dir-1-dir-2': [
                                {
                                    'file-2.txt': []
                                }
                            ]
                        },
                        {
                            'file-3.txt': []
                        }
                    ]
                },
                {
                    'file-1.txt': []
                }
            ]
        };

        expect(treeMaker.getTree()).deep.equal(expected);
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
