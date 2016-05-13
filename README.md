# csso-loader
[![NPM version](https://img.shields.io/npm/v/csso-loader.svg)](https://www.npmjs.com/package/csso-loader)
[![Build Status](https://img.shields.io/travis/sandark7/csso-loader.svg)](https://travis-ci.org/sandark7/csso-loader)
[![Dependency Status](https://img.shields.io/gemnasium/sandark7/csso-loader.svg)](https://gemnasium.com/sandark7/csso-loader)
[![Code Climate](https://codeclimate.com/github/sandark7/csso-loader/badges/gpa.svg)](https://codeclimate.com/github/sandark7/csso-loader)
[![Test Coverage](https://codeclimate.com/github/sandark7/csso-loader/badges/coverage.svg)](https://codeclimate.com/github/sandark7/csso-loader/coverage)

> [CSSO](https://www.npmjs.com/package/csso) loader module for [webpack](https://www.npmjs.com/package/webpack)

Minify input CSS with [CSSO](https://www.npmjs.com/package/csso).

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Installation

```
npm install csso-loader --save-dev
```

## Examples

Using [csso-loader](https://www.npmjs.com/package/csso-loader) with [css-loader](https://www.npmjs.com/package/css-loader).

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader',
      }
    ]
  }
};
```

## Advanced options

### restructure

Default: `true`

`csso` performs structural optimization for better compression by default.
Use `-restructure` in case you want to disable it.

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader?-restructure',
      }
    ]
  }
};
```

Also it can be disabled by `restructure` boolean option in `csso` object of webpack config.

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader',
      }
    ]
  },
  csso: {
    restructure: false
  }
};
```

### debug

Default: `false`

`debug` is using to get details about the minification process.

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader?debug',
      }
    ]
  }
};
```

Also you can set `debug` option in `csso` object of webpack config.
It can be boolean or a positive number from 1 to 3 (greater number for more details).

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader',
      }
    ]
  },
  csso: {
    debug: 3
  }
};
```

### comments

Default: `exclamation` or `true`

`csso` leave all exclamation comments by default (i.e. `/*! .. */`).
Use '-comments' to remove all comments.

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader?-comments',
      }
    ]
  }
};
```

Also you can set `comments` option in `csso` object of webpack config.
It can be boolean or string (use `first-exclamation` to remove all comments except first one with exclamation).

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader',
      }
    ]
  },
  csso: {
    comments: 'first-exclamation'
  }
};
```

### usage

With `usage` option you can set data about CSS usage. For example, white lists (`tags`, `ids` and `classes`) can be set to filter unused selectors and related CSS rules as well. See [Usage data](https://github.com/css/csso#usage-data) in `csso` documentation for more details.

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader',
      }
    ]
  },
  csso: {
    usage: {
      tags: ['span', 'div'],
      ids: ['id1'],
      classes: ['class1', 'class2', 'class3', 'class4']
      scopes: [
        ['class1', 'class2'],
        ['class3', 'class4']
      ]
    }
  }
};
```

### logger

To log how CSS is transforming through compression stages use `logger` option.
First argument is a stage name, and second one is AST of current state CSS or `null`.

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader',
      }
    ]
  },
  csso: {
    logger: function(stage, ast) {
      console.log(stage, ast);
    }
  }
};
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php) © Andrew Smirnov
