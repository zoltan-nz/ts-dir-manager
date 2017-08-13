import { expect } from 'chai';
import * as path from 'path';
import { Tree } from '../../src/tree';

const FIXTURE_DIRECTORY = path.resolve(__dirname, '../fixtures/fixture-directory');
const FIXTURE_FILE = path.resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

  it('should be Tree', () => {
    const tree = new Tree(FIXTURE_DIRECTORY);

    expect(tree).is.instanceOf(Tree);
  });
});
