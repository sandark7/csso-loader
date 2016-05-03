'use strict';

var path = require('path');
var csso = require('csso');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  var query = loaderUtils.parseQuery(this.query);
  var cssoOptions = this.options ? this.options.csso : false;
  var filename = path.basename(this.resourcePath);
  var options = {};
  var result;

  if (this.cacheable) {
    this.cacheable();
  }

  if (typeof query.debug === 'boolean') {
    options.debug = query.debug;
  }

  if (typeof query.restructure === 'boolean') {
    options.restructure = query.restructure;
  }

  if (typeof cssoOptions === 'object') {
    if (typeof cssoOptions.debug === 'boolean' || [1, 2, 3].indexOf(cssoOptions.debug) !== -1) {
      options.debug = cssoOptions.debug;
    }
    if (typeof cssoOptions.restructure === 'boolean') {
      options.restructure = cssoOptions.restructure;
    }
    if (typeof cssoOptions.usage === 'object') {
      options.usage = cssoOptions.usage;
    }
    if (typeof cssoOptions.logger === 'function') {
      options.logger = cssoOptions.logger;
    }
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
