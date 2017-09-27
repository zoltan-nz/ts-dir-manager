# Library for reading directory tree and generating a json object

## Development

```
npm start

npm run lint
npm run build
npm run build:production

npm run watch:build
npm run watch:test
npm run watch:lint
```

## Architecture

Example directory tree:

    app/
        adapters/
            application.js
        controllers/
            application.js
            index.js
        style.css

**Example output in a json format:**

```json
{
  "tree": {
    "name": "app",
    "type": "directory",
    "children": [
      {
        "name": "style.css",
        "type": "file"
      },
      {
        "name": "adapters",
        "type": "directory",
        "children": [
          {
            "name": "application.js",
            "type": "file"
          }
        ]
      },
      {
        "name": "controllers",
        "type": "directory",
        "children": [
          {
            "name": "application.js",
            "type": "file"
          },
          {
            "name": "index.js",
            "type": "file"
          }
        ]
      }
    ]
  }
}
```

## MileStone I.

* Create a command line tool
* Expect two parameters

    - source directory
    - destination file (optional, default export file name: 'dir-manager-output.json')
    
  `$ ts-dir-manager ./fixtures/app ./output.json`

### Architecture:

* dir-manager.ts (cli)
* tree.ts (Reading folder and creating the tree json)

```
Tree object:
    {
        name: string
        type: "file" | "directory"
        children?: Array<Tree>
    }
```

## Add jest

Add config to `package.json`:

```
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json"
    ]
  }
```

```
$ npm i -D jest @types/jest ts-jest
$ mkdir __test__
$ touch ./__test__/tree.test.ts

$ jest
```

# Usage

```js
import Tree from 'ts-dir-manager'

const tree=new Tree('./folder');
console.log(JSON.stringify(tree.json));
```