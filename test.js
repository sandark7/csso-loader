'use strict';

const loader = require('./index.js');
const invalidInput = 'div { background=white; }';
const simpleInput = 'div { background: white; }';
const simpleOutput = 'div{background:#fff}';
const complexInput = 'div { background: white; } span { background: blue; } ul { background: white; }';
const complexOutput = 'div{background:#fff}span{background:#00f}ul{background:#fff}';
const restructuredOutput = 'div,ul{background:#fff}span{background:#00f}';
const commentsInput = '/*! comment */ div { /*! comment */ background: white; }';

let globalOutput = [];
console.error = function(message) {
  globalOutput.push(message);
};

let testLoader = function(input, output, options) {
  options = typeof options !== 'undefined' ?  options : {};
  expect(
    loader.call(options, input)
  ).toEqual(output);
};

let testLoaderOutput = function(input, output, options) {
  options = typeof options !== 'undefined' ?  options : {};
  globalOutput = [];
  loader.call(options, input);
  expect(globalOutput).toContain(output);
};

describe('csso-loader', function() {
  it('should minimize css', function() {
    testLoader(simpleInput, simpleOutput);
  });

  it('should return restructured css by default', function() {
    testLoader(complexInput, restructuredOutput);
  });

  it('should return original css in case of error input', function() {
    testLoader(invalidInput, invalidInput);
  });

  it('should throw error to console in case of error input', function() {
    testLoaderOutput(
      invalidInput,
      ' \nCssSyntaxError : Colon is expected\nLine: 1\nColumn: 17'
    );
  });

  it('should return debug information in case of debug parameter', function() {
    testLoaderOutput(
      simpleInput,
      '## parsing done in %d ms\n', {
        query: '?debug'
      }
    );
  });

  it('should return debug information in case of debug equals true in csso options', function() {
    testLoaderOutput(
      simpleInput,
      '## compress done in %d ms\n', {
        options: {
          csso: {
            debug: true
          }
        }
      }
    );
  });

  it('should return more debug information in case of debug equals 3 in csso options', function() {
    testLoaderOutput(
      simpleInput,
      '[0.000s] clean\n  div{background:white}\n', {
        options: {
          csso: {
            debug: 3
          }
        }
      }
    );
  });

  it('should overwrite debug information in csso options over query debug parameter', function() {
    globalOutput = [];
    loader.call({
      query: '?debug',
      options: {
        csso: {
          debug: false
        }
      }
    }, simpleInput);
    expect(globalOutput).toHaveLength(0);
  });

  it('should return non-restructured css in case of -restructure parameter', function() {
    testLoader(
      complexInput,
      complexOutput, {
        query: '?-restructure'
      }
    );
  });

  it('should return non-restructured css in case of restructure equals false in csso options', function() {
    testLoader(
      complexInput,
      complexOutput, {
        options: {
          csso: {
            restructure: false
          }
        }
      }
    );
  });

  it('should overwrite restructure information in csso options over query restructure parameter', function() {
    testLoader(
      complexInput,
      restructuredOutput, {
        query: '?-restructure',
        options: {
          csso: {
            restructure: true
          }
        }
      }
    );
  });

  it('should cut unnecessary tags, ids and classes from css due to usage data in csso options', function() {
    testLoader(
      'div { background: white; } span { background: blue; } #id1 { background: white; } #id2 { background: red; } .class1 { background: blue; } .class2 { background: green; }',
      '.class1,span{background:#00f}#id1{background:#fff}', {
        options: {
          csso: {
            usage: {
              tags: ['span'],
              ids: ['id1'],
              classes: ['class1']
            }
          }
        }
      }
    );
  });

  it('should return optimized css due to scopes in usage data in csso options', function() {
    testLoader(
      '.class1 { background: white; } .class2 { font-size: 20px; } .class3 { background: white; } .class4 { font-size: 25px; }',
      '.class1,.class3{background:#fff}.class2{font-size:20px}.class4{font-size:25px}', {
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
      }
    );
  });

  it('should return debug information in logger function in csso options', function() {
    testLoaderOutput(
      simpleInput,
      'initialMergeRuleset', {
        options: {
          csso: {
            logger: function(stage, data) {
              console.error(stage, data);
            }
          }
        }
      }
    );
  });

  it('should leave exclamation comments in optimized css by default', function() {
    testLoader(
      '/*! comment */ div { background: white; } /*! comment */ /* comment */',
      '/*! comment */\ndiv{background:#fff}\n/*! comment */'
    );
  });

  it('should leave only first exclamation comment in optimized css due to first-exclamation in comments in csso options', function() {
    testLoader(
      commentsInput,
      '/*! comment */\ndiv{background:#fff}', {
        options: {
          csso: {
            comments: 'first-exclamation'
          }
        }
      }
    );
  });

  it('should cut all comments in optimized css due to false in comments in csso options', function() {
    testLoader(
      commentsInput,
      simpleOutput, {
        options: {
          csso: {
            comments: false
          }
        }
      }
    );
  });

  it('should cut all comments in optimized css in case of -comments parameter', function() {
    testLoader(
      commentsInput,
      simpleOutput, {
        query: '?-comments'
      }
    );
  });
});
