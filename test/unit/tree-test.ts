import { expect } from 'chai';

import * as path from 'path';

import { buildTree, getChildren, getName, getStats } from '../../src/tree';
import * as fs from 'fs';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

  it('#getName - should return the file name', () => {
    expect(getName(FIXTURE_DIRECTORY)).equal('fixture-directory');
  });

  it('#getChildren - should return an array of string of children path', async () => {
    const dir1Directory = `${FIXTURE_DIRECTORY}/dir-1`;
    const file1 = FIXTURE_FILE;

    const children = await getChildren(FIXTURE_DIRECTORY);
    expect(children.length).equal(2);
    expect(children).deep.equal([dir1Directory, file1]);
  });

  it('#buildTree - should return an Object', async () => {
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

    const tree = await buildTree(FIXTURE_DIRECTORY);
    expect(tree).deep.equal(expected);
  });

  it('#getStats - should return with stat false when file can not be read', async () => {
    let file;
    try {
      file = await getStats('not-existing.file');
    } catch (reason) {
      file = reason;
    }

    expect(file, 'not existing file should return false').to.be.false;
  });

  it('#getStats - should return fs.Stats object', async () => {
    const dir = await getStats(FIXTURE_DIRECTORY);
    const expected = fs.statSync(FIXTURE_DIRECTORY);

    expect(dir).deep.equal(expected);
  });
});
