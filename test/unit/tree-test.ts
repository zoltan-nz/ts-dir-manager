import { expect } from 'chai';
import { resolve } from 'path';
import Tree from '../../src/tree';
import expectedOutput from '../fixtures/expected-output';

const FIXTURE_DIRECTORY = resolve(__dirname, '../fixtures');
const FIXTURE_FILE = resolve(__dirname, '../fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

  it('should be Tree', () => {
    const tree = new Tree(FIXTURE_DIRECTORY);

    expect(tree).is.instanceOf(Tree);
  });

  it('#json - return json tree', () => {
    const tree = new Tree(FIXTURE_DIRECTORY);

    expect(tree.json).is.deep.equal(expectedOutput);
  });
});
