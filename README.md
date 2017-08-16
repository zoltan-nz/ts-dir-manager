# Read directory tree and save in a file

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

* dir-manager.ts (main, entry cli file)
* tree.ts (Reading folder and creating the tree json)

```
Tree object:
    {
        name: string
        type: "file" | "directory"
        children?: Array<Tree>
    }
```