'use strict';

var path = require('path');
var csso = require('csso');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  var query = loaderUtils.parseQuery(this.query);
  var filename = path.basename(this.resourcePath);
  var options = {};
  var result;

  if (this.cacheable) {
    this.cacheable();
  }

  if ([true, '1', '2', '3'].indexOf(query.debug) !== -1) {
    options.debug = query.debug;
  }

  if (query.restructure === false) {
    options.restructure = false;
  }

  try {
    result = csso.minify(source, options);
  } catch (error) {
    console.error([' ',
      error.name + ' ' + filename + ': ' + error.message,
      'Line: ' + error.parseError.line,
      'Column: ' + error.parseError.column
    ].join('\n'));
  }

  if (result) {
    return result.css;
  }

  return source;
};
