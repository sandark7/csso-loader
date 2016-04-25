# csso-loader
[![NPM version](https://img.shields.io/npm/v/csso-loader.svg)](https://www.npmjs.com/package/csso-loader)
[![Build Status](https://img.shields.io/travis/SanDark7/csso-loader.svg)](https://travis-ci.org/SanDark7/csso-loader)
[![Dependency Status](https://img.shields.io/gemnasium/SanDark7/csso-loader.svg)](https://gemnasium.com/SanDark7/csso-loader)

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

The default is to use structure minimization for maximum compression.
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

You can pass to `debug` a positive number from 1 to 3 (greater number for more details).

``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader!csso-loader?debug=3',
      }
    ]
  }
};
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php) © Andrew Smirnov
