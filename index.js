'use strict';

var csso = require('csso');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  var query = loaderUtils.parseQuery(this.query);

  if (this.cacheable) this.cacheable();

  console.log(source, query);
}
