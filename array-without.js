(function(root) {
  'use strict';

  function arrayWithoutInline(a) {
    var arr, args;
    if (Array.isArray(this)) {
      arr = this;
      args = [].slice.call(arguments);
    } else {
      if (!Array.isArray(a)) {
        return [];
      }
      arr = a;
      args = [].slice.call(arguments, 1);
    }
    args = flatten(args);
    for (var i = 0; i < args.length; i++) {
      var j = arr.indexOf(args[i]);
      if (j > -1) {
        arr.splice(j, 1);
      }
    }
    return arr;
  }

  function arrayWithout(a) {
    var args = [].slice.call(arguments);
    if (Array.isArray(this)) {
      args = [this.slice()].concat(args);
    } else {
      if (Array.isArray(a)) {
        args[0] = [].slice.call(args[0])
      }
    }
    return arrayWithoutInline.apply(null, args);
  }

  function flatten(a) {
    return Array.isArray(a) ? [].concat.apply([], a.map(flatten)) : [a];
  }

  arrayWithout.inline = arrayWithoutInline;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = arrayWithout;
    }
    exports.arrayWithout = arrayWithout;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return arrayWithout;
    });
  } else {
    root.arrayWithout = arrayWithout;
  }

})(this);
