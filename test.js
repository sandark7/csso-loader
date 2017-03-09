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
      ' \nCssSyntaxError : Colon is expected\nLine: 1\nColumn: 17\n'
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
  it('should cut unnecessary tags, ids and classes from css due to usage data in csso options', function() {
    loader.call({
      options: {
        csso: {
          usage: {
            tags: ['span'],
            ids: ['id1'],
            classes: ['class1']
          }
        }
      }
    }, 'div { background: white; } span { background: blue; } #id1 { background: white; } #id2 { background: red; } .class1 { background: blue; } .class2 { background: green; }').should.be.eql(
      '.class1,span{background:#00f}#id1{background:#fff}'
    );
  });
  it('should return optimized css due to scopes in usage data in csso options', function() {
    loader.call({
      options: {
        csso: {
          usage: {
            scopes: [
              ['class1', 'class2'],
              ['class3', 'class4']
            ]
          }
        }
      }
    }, '.class1 { background: white; } .class2 { font-size: 20px; } .class3 { background: white; } .class4 { font-size: 25px; }').should.be.eql(
      '.class1,.class3{background:#fff}.class2{font-size:20px}.class4{font-size:25px}'
    );
  });
  it('should return debug information in logger function in csso options', function() {
    var inspect = stderr.inspect();
    loader.call({
      options: {
        csso: {
          logger: function(stage, data) {
            console.error(stage, data);
          }
        }
      }
    }, 'div { background: white; }');
    inspect.restore();
    inspect.output[1].should.endWith(
      '}\n'
    );
  });
  it('should leave exclamation comments in optimized css by default', function() {
    loader.call({}, '/*! comment */ div { background: white; } /*! comment */ /* comment */').should.be.eql(
      '/*! comment */\ndiv{background:#fff}\n/*! comment */'
    );
  });
  it('should leave only first exclamation comment in optimized css due to first-exclamation in comments in csso options', function() {
    loader.call({
      options: {
        csso: {
          comments: 'first-exclamation'
        }
      }
    }, '/*! comment */ div { background: white; } /*! comment */').should.be.eql(
      '/*! comment */\ndiv{background:#fff}'
    );
  });

  it('should cut all comments in optimized css due to false in comments in csso options', function() {
    loader.call({
      options: {
        csso: {
          comments: false
        }
      }
    }, '/*! comment */ div { /*! comment */ background: white; }').should.startWith(
      'div{background'
    );
  });
  it('should cut all comments in optimized css in case of -comments parameter', function() {
    loader.call({
      query: '?-comments'
    }, '/*! comment */ div { /*! comment */ background: white; }').should.startWith(
      'div{background'
    );
  });
});
