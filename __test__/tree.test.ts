import { resolve } from 'path';
import Tree from '../src/tree';
import expectedOutput from '../test/fixtures/expected-output';

const FIXTURE_DIRECTORY = resolve(__dirname, '../test/fixtures');
const FIXTURE_FILE = resolve(__dirname, '../test/fixtures/fixture-directory/file-1.txt');

describe('Tree', () => {

  test('should be Tree', () => {
    const tree = new Tree(FIXTURE_DIRECTORY);

    expect(tree).toBeInstanceOf(Tree);
  });

  test('#json - return json tree', () => {
    const tree = new Tree(FIXTURE_DIRECTORY);

    expect(tree.json).toEqual(expectedOutput);
  });
});
