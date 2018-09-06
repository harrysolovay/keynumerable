function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var aIncludesE = function aIncludesE(a, e) {
  for (var i = 0; i < a.length; i++) {
    if (JSON.stringify(a[i]) === JSON.stringify(e)) {
      return true;
    }
  }

  return false;
};

var Keynumerable =
/*#__PURE__*/
function () {
  function Keynumerable(args) {
    _defineProperty(this, "container", void 0);

    this.container = function () {
      if (!args) {
        return [];
      }

      if (args instanceof Array && !(args[0] instanceof Array)) {
        return [args];
      } else if (args[0] && args[0] instanceof Array) {
        return args;
      } else if (args instanceof Keynumerable) {
        return args.container;
      } else {
        return [[args]];
      }
    }();
  }

  var _proto = Keynumerable.prototype;

  _proto.get = function get(e) {
    // if element argument
    return e // return the row containing the element
    ? this.container.filter(function (row) {
      return aIncludesE(row, e);
    })[0] // othrewise, return the entire container
    : this.container;
  };

  _proto.set = function set(newEntry) {

    var replaced = []; // reduce container into into itself

    this.container = this.container.reduce(function (accumulator, entry) {
      // whether entry should be in the reduced container
      // determined by whether the two have items in common
      var entryReplaced = false; // if keys shared between newEntry and the given entry

      for (var i = 0; i < newEntry.length; i++) {
        if (aIncludesE(entry, newEntry[i])) {
          // save entry (excluded from the reduced array)
          replaced.push(entry); // flag entry for replacement

          entryReplaced = true;
          break;
        }
      } // if marked for replacement


      return entryReplaced // don't include it in the next round's accumulator
      ? accumulator // otherwise, do
      : accumulator.concat([entry]);
    }, [newEntry]); // return container of entries that didn't make it to new this.container

    return replaced;
  };

  _proto.remove = function remove(key) {
    // check for a matching element in this.container
    for (var i = 0; i < this.container.length; i++) {
      // if match found
      if (aIncludesE(this.container[i], key)) {
        // splice it out, and return the removed element
        return this.container.splice(i, 1);
      }
    }
  };

  return Keynumerable;
}();

export default Keynumerable;
