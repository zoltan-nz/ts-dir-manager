import {expect} from 'chai';

import * as path from 'path';

import File from '../../src/file';
import * as fs from 'fs';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

    it('#new - should create a directory IFile instance', () => {
        const file = new File(FIXTURE_DIRECTORY);

        expect(file, 'should create an instance').is.instanceof(File);
    });

    it('#new - should create a file IFile instance', () => {
        const file = new File(FIXTURE_FILE);

        expect(file, 'should create an instance').is.instanceof(File);
    });

    it('#new - should errors when the file does not exists', () => {
        expect(() => new File('not-existing.file'), 'not existing file should throw an ENOENT error')
            .to.throw(/ENOENT/);
        expect(() => new File(''), 'empty string as param should throw an assert error').to.throw();
    });

    it('#new - should return an IFile compatible object', () => {
        const file = new File(FIXTURE_DIRECTORY);
        const iFile = {
            stat: fs.statSync(FIXTURE_DIRECTORY),
            children: [],
            name: 'fixture-directory',
            path: FIXTURE_DIRECTORY
        };

        expect(file).is.deep.equal(iFile);
    });
});
