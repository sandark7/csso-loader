'use strict';

var loader = require('./index.js');
var stderr = require('test-console').stderr;

require('should');

describe('csso-loader', function() {
  it('should minimize css', function() {
    loader.call({}, 'div { background: white; }').should.be.eql(
      'div{background:#fff}'
    );
  });
  it('should return restructured css by default', function() {
    loader.call({}, 'div { background: white; } span { background: blue; } ul { background: white; }').should.be.eql(
      'div,ul{background:#fff}span{background:#00f}'
    );
  });
  it('should return original css in case of error input', function() {
    var inspect = stderr.inspect();
    loader.call({}, 'div { background=white; }').should.be.eql(
      'div { background=white; }'
    );
    inspect.restore();
  });
  it('should throw error to console in case of error input', function() {
    var inspect = stderr.inspect();
    loader.call({}, 'div { background=white; }');
    inspect.restore();
    inspect.output.should.be.eql([
      ' \nCssSyntaxError undefined: Colon is expected\nLine: 1\nColumn: 17\n'
    ]);
  });
  it('should return debug information in case of debug parameter', function() {
    var inspect = stderr.inspect();
    loader.call({
      query: '?debug'
    }, 'div { background: white; }');
    inspect.restore();
    inspect.output[0].should.startWith(
      '## parsing done in '
    );
  });
  it('should return debug information in case of debug equals true in csso options', function() {
    var inspect = stderr.inspect();
    loader.call({
      options: {
        csso: {
          debug: true
        }
      }
    }, 'div { background: white; }');
    inspect.restore();
    inspect.output[2].should.endWith(
      'init\n'
    );
  });
  it('should return more debug information in case of debug equals 3 in csso options', function() {
    var inspect = stderr.inspect();
    loader.call({
      options: {
        csso: {
          debug: 3
        }
      }
    }, 'div { background: white; }');
    inspect.restore();
    inspect.output[2].should.endWith(
      'div{background:white}\n\n'
    );
  });
  it('should overwrite debug information in csso options over query debug parameter', function() {
    var inspect = stderr.inspect();
    loader.call({
      query: '?debug',
      options: {
        csso: {
          debug: false
        }
      }
    }, 'div { background: white; }');
    inspect.restore();
    inspect.output.should.be.empty();
  });
  it('should return non-restructured css in case of -restructure parameter', function() {
    loader.call({
      query: '?-restructure'
    }, 'div { background: white; } span { background: blue; } ul { background: white; }').should.be.eql(
      'div{background:#fff}span{background:#00f}ul{background:#fff}'
    );
  });
  it('should return non-restructured css in case of restructure equals false in csso options', function() {
    loader.call({
      options: {
        csso: {
          restructure: false
        }
      }
    }, 'div { background: white; } span { background: blue; } ul { background: white; }').should.be.eql(
      'div{background:#fff}span{background:#00f}ul{background:#fff}'
    );
  });
  it('should overwrite restructure information in csso options over query restructure parameter', function() {
    loader.call({
      query: '?-restructure',
      options: {
        csso: {
          restructure: true
        }
      }
    }, 'div { background: white; } span { background: blue; } ul { background: white; }').should.be.eql(
      'div,ul{background:#fff}span{background:#00f}'
    );
  });
});
