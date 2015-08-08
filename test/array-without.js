var test = require('tape');
var without = require('../array-without');

test('without', function (t) {
  'use strict';

  t.plan(32);

  t.deepEqual(without(['a','b','c'], 'c'), ['a','b']);
  t.deepEqual(without(['a','b','c'], ['b','c']), ['a']);
  t.deepEqual(without(['a','b','c'], 'b','c'), ['a']);
  t.deepEqual(without(['a','b','c'], {}), ['a','b','c']);
  t.deepEqual(without(undefined, 'a'), []);
  t.deepEqual(without(null, 'a'), []);
  t.deepEqual(without([], 'a'), []);
  t.deepEqual(without(123, 'a'), []);
  t.deepEqual(without({}, 'a'), []);
  t.deepEqual(without([1]), [1]);

  var testInline = function(arr) {
    var remove = [].slice.call(arguments, 1, arguments.length - 1);
    var expected = arguments[arguments.length - 1];
    without.inline(arr, remove);
    t.deepEqual(arr, expected);
  }

  testInline(['a','b','c'], 'c', ['a','b']);
  testInline(['a','b','c'], ['b','c'], ['a']);
  testInline(['a','b','c'], 'b','c', ['a']);
  testInline(['a','b','c'], {}, ['a','b','c']);
  testInline(undefined, 'a', undefined);
  testInline(null, 'a', null);
  testInline([], 'a', []);
  testInline(123, 'a', 123);
  testInline({}, 'a', {});
  testInline([1], [1]);

  try {
    Array.prototype.without = without;
    t.deepEqual(['a','b','c'].without('c'), ['a','b']);
    t.deepEqual(['a','b','c'].without(['b','c']), ['a']);
    t.deepEqual(['a','b','c'].without('b','c'), ['a']);
    t.deepEqual(['a','b','c'].without({}), ['a','b','c']);
    t.deepEqual([].without('a'), []);
    t.deepEqual([1].without(), [1]);
  } finally {
    if (Array.prototype.without) {
      delete Array.prototype.without;
    }
  }

  try {
    Array.prototype.withoutInline = without.inline;

    var testInlineProto = function(arr) {
      var remove = [].slice.call(arguments, 1, arguments.length - 1);
      var expected = arguments[arguments.length - 1];
      arr.withoutInline(remove);
      t.deepEqual(arr, expected);
    }

    testInlineProto(['a','b','c'], 'c', ['a','b']);
    testInlineProto(['a','b','c'], ['b','c'], ['a']);
    testInlineProto(['a','b','c'], 'b','c', ['a']);
    testInlineProto(['a','b','c'], {}, ['a','b','c']);
    testInlineProto([], 'a', []);
    testInlineProto([1], [1]);
  } finally {
    if (Array.prototype.withoutInline) {
      delete Array.prototype.withoutInline;
    }
  }
});
