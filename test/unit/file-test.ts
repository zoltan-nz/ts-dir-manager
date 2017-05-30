import { expect } from 'chai';
import * as fs from 'fs';

import * as path from 'path';

import File, { IFile } from '../../src/file';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('File', () => {

  it('#new - should create a directory IFile instance', () => {
    const file = new File(FIXTURE_DIRECTORY);

    expect(file, 'should create an instance').is.instanceof(File);
  });

  it('#new - should create a file IFile instance', () => {
    const file = new File(FIXTURE_FILE);

    expect(file, 'should create an instance').is.instanceof(File);
  });

  it('#new - should return with stat false when file can not be read', () => {
    const file = new File('not-existing.file');

    expect(file.isValid, 'not existing file should change isValid to false')
      .to.be.false;
  });

  it('#new - wrong param should thrown an assert error', () => {
    expect(() => new File(''), 'empty string as param should throw an assert error').to.throw();
  });

  it('#new - should return an IFile compatible object', () => {
    const file = new File(FIXTURE_DIRECTORY);
    const iFile = {
      name:     'fixture-directory',
      path:     FIXTURE_DIRECTORY,
      isValid:  false,
      _children: [],
      _isChildrenUpdated: false,
      _isStatUpdated: false
    };

    expect(file).is.deep.equal(iFile);
  });

  it('#size - shows the number of sub elements (childrens)', () => {
    const file = new File(FIXTURE_DIRECTORY);
    file.size();

    expect(file.size(), 'show the number of children').to.be.equal(2);
  });
});
