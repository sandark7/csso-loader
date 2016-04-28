# csso-loader
[![NPM version](https://img.shields.io/npm/v/csso-loader.svg)](https://www.npmjs.com/package/csso-loader)
[![Build Status](https://img.shields.io/travis/sandark7/csso-loader.svg)](https://travis-ci.org/sandark7/csso-loader)
[![Code Climate](https://codeclimate.com/github/sandark7/csso-loader/badges/gpa.svg)](https://codeclimate.com/github/sandark7/csso-loader)

> [CSSO](https://www.npmjs.com/package/csso) loader module for [webpack](https://www.npmjs.com/package/webpack)

Minify incoming CSS with [CSSO](https://www.npmjs.com/package/csso).

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Installation

```
npm install csso-loader --save-dev
```

## Examples

In examples result of [csso-loader](https://www.npmjs.com/package/csso-loader)
is processed with [css-loader](https://www.npmjs.com/package/css-loader).

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

By default CSSO uses structure minimization for maximum compression.
Pass `-restructure` instead if you want to disable this feature.

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

Also you can pass `restructure` boolean parameter to `csso` object in webpack options.

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

Pass `debug` to get debugging information about the minification process.

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

Also you can pass `debug` parameter to `csso` object in webpack options.
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

### usage

Pass `usage` object parameter to `csso` object in webpack options.
It accepts arrays of `tags`, `ids` and `classes` to save them in optimized css.
Also it can use `scopes` to solve problems with restructuring css.
You can read more about usage data [here](https://github.com/css/csso).

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

## License

[MIT](http://www.opensource.org/licenses/mit-license.php) © Andrew Smirnov
