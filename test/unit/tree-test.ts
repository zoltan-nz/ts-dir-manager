import { expect } from 'chai';

import * as path from 'path';

import { Tree } from '../../src/tree';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

  it('new - should create an instance', () => {
    const treeMaker = new Tree(FIXTURE_DIRECTORY);

    expect(treeMaker, 'should create an instance').is.instanceof(Tree);
  });


  it('entry - should contain the tree object', () => {
    const treeMaker = new Tree(FIXTURE_DIRECTORY);

    expect(treeMaker.entry).is.not.empty;
  });

  it('entry.children - should contain the children objects', () => {
    const treeMaker = new Tree(FIXTURE_DIRECTORY);
    const dir1Tree = new Tree(`${FIXTURE_DIRECTORY}/dir-1`);
    const file1Tree = new Tree(`${FIXTURE_DIRECTORY}/file-1.txt`);

    expect(treeMaker.entry.children).length(2);
    expect(treeMaker.entry.children).deep.equal([dir1Tree, file1Tree]);
  });

  it('#getTree - should return an Object', () => {
    const treeMaker = new Tree(FIXTURE_DIRECTORY);
    const expected = {
      'fixture-directory': [
        {
          'dir-1': [
            {
              'dir-1-dir-2': [
                {
                  'file-2.txt': ''
                }
              ]
            },
            {
              'file-3.txt': ''
            }
          ]
        },
        {
          'file-1.txt': ''
        }
      ]
    };

    expect(treeMaker.getTree()).deep.equal(expected);
  });
});
