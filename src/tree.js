"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var mz_1 = require("mz");
var path_1 = require("path");
var debug = Debug('dir-manager');
var FileType;
(function (FileType) {
    FileType["File"] = "file";
    FileType["Directory"] = "directory";
})(FileType = exports.FileType || (exports.FileType = {}));
var Tree = /** @class */ (function () {
    function Tree(path) {
        this.path = path;
    }
    Object.defineProperty(Tree.prototype, "json", {
        get: function () {
            return {
                path: this.path,
                name: this.name,
                size: this.size,
                extension: this.extension,
                type: this.type,
                children: this.children
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "name", {
        get: function () {
            return path_1.basename(this.path);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "size", {
        get: function () {
            return this.stat.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "extension", {
        get: function () {
            return path_1.extname(this.path).toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "type", {
        get: function () {
            return this.stat.isDirectory() ? FileType.Directory : FileType.File;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "children", {
        get: function () {
            var _this = this;
            if (this.stat.isDirectory()) {
                var children = this.dir;
                return children.map(function (child) { return new Tree(path_1.join(_this.path, child)).json; });
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "stat", {
        get: function () {
            try {
                return mz_1.fs.statSync(this.path);
            }
            catch (e) {
                return new mz_1.fs.Stats();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "dir", {
        get: function () {
            return mz_1.fs.readdirSync(this.path);
        },
        enumerable: true,
        configurable: true
    });
    return Tree;
}());
exports.default = Tree;
