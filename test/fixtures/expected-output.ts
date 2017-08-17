import * as process from 'process';

const cwd = process.cwd();

export default {
  path:      `${cwd}/test/fixtures`,
  name:      'fixtures',
  size:      136,
  extension: '',
  type:      'directory',
  children:  [
    {
      path:      `${cwd}/test/fixtures/app`,
      name:      'app',
      size:      170,
      extension: '',
      type:      'directory',
      children:  [
        {
          path:      `${cwd}/test/fixtures/app/adapters`,
          name:      'adapters',
          size:      102,
          extension: '',
          type:      'directory',
          children:  [
            {
              path:      `${cwd}/test/fixtures/app/adapters/application.js`,
              name:      'application.js',
              size:      0,
              extension: '.js',
              type:      'file',
              children:  []
            }
          ]
        },
        {
          path:      `${cwd}/test/fixtures/app/controllers`,
          name:      'controllers',
          size:      170,
          extension: '',
          type:      'directory',
          children:  [
            {
              path:      `${cwd}/test/fixtures/app/controllers/application.js`,
              name:      'application.js',
              size:      0,
              extension: '.js',
              type:      'file',
              children:  []
            },
            {
              path:      `${cwd}/test/fixtures/app/controllers/index.js`,
              name:      'index.js',
              size:      0,
              extension: '.js',
              type:      'file',
              children:  []
            },
            {
              path:      `${cwd}/test/fixtures/app/controllers/style.css`,
              name:      'style.css',
              size:      0,
              extension: '.css',
              type:      'file',
              children:  []
            }
          ]
        },
        {
          path:      `${cwd}/test/fixtures/app/style.css`,
          name:      'style.css',
          size:      0,
          extension: '.css',
          type:      'file',
          children:  []
        }
      ]
    },
    {
      path:      `${cwd}/test/fixtures/expected-output.ts`,
      name:      'expected-output.ts',
      size:      2367,
      extension: '.ts',
      type:      'file',
      children:  []
    }
  ]
};
