import { expect } from 'chai';

import * as path from 'path';

import File from '../../src/file';
import { Tree } from '../../src/tree';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

  it('new - should create an instance', () => {
    const fixtureDirectory = new File(FIXTURE_DIRECTORY);
    const treeMaker = new Tree(fixtureDirectory);

    expect(treeMaker, 'should create an instance').is.instanceof(Tree);
  });

  it('entry - should contain the tree object', () => {
    const fixtureDirectory = new File(FIXTURE_DIRECTORY);
    const treeMaker = new Tree(fixtureDirectory);

    expect(treeMaker.entry).is.not.empty;
  });

  it('entry.getChildren() - should return the children objects', async () => {
    const fixtureDirectory = new File(FIXTURE_DIRECTORY);
    const treeMaker = new Tree(fixtureDirectory);
    const dir1TreeDirectory = new File(`${FIXTURE_DIRECTORY}/dir-1`);
    const dir1Tree = new Tree(dir1TreeDirectory);
    const file1TreeFile = new File(`${FIXTURE_FILE}`);
    const file1Tree = new Tree(file1TreeFile);

    const children = await treeMaker.entry.getChildren();

    expect(children.length).to.be.equal(2);
  });

  it('#buildTree - should return an Object', async () => {
    const fixtureDirectory = new File(FIXTURE_DIRECTORY);
    const treeMaker = new Tree(fixtureDirectory);
    const expected = {
      'fixture-directory': [
        {
          'dir-1': [
            {
              'dir-1-dir-2': [
                {
                  'false-symlink': ''
                },
                {
                  'file-2.txt': ''
                },
                {
                  symlink: ''
                }
              ]
            },
            {
              'file-3.txt': ''
            },
            {
              symdir: [
                {
                  'false-symlink': ''
                },
                {
                  'file-2.txt': ''
                },
                {
                  symlink: ''
                }
              ]
            }
          ]
        },
        {
          'file-1.txt': ''
        }
      ]
    };

    const tree = await treeMaker.buildTree();
    expect(tree).deep.equal(expected);
  });
});
