'use strict';

// If you pass this function (foo, 'bar.baz', 'quux') it will execute foo.bar.baz = 'quux';
// Creates intermediary objects along the way, too.
function setprop(obj, path, value) {
   var parts = path.split('.');
   if (parts.length === 1) {
      obj[parts[0]] = value;
      return;
   }
   if (!(parts[0] in obj)) {
      obj[parts[0]] = {};
   }
   var x = parts.shift();
   setprop(obj[x], parts.join('.'), value);
}

function getprop(obj, path, _default) {
    if (path === '') {
       return obj;
    }
    if (typeof obj !== 'object') {
      return _default;
    }
    var parts = path.split('.');
    var firstaccessor = parts[0];
    parts.shift();
    obj = obj[firstaccessor];
    return getprop(obj, parts.join('.'), _default);
}
