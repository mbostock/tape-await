var _ = require("tape");
var deepEql = require("deep-eql");

function wrap(run) {
  return function(test) {
    try {
      Promise.resolve(run(test)).then(
        function() { test.end(); },
        function(error) { test.end(error || new Error("rejected")); }
      );
    } catch (error) {
      test.end(error);
    }
  };
}

function tape(description, run) {
  return _(description, wrap(run));
};

tape.skip = function(description, run) {
  return _.skip(description, wrap(run));
};

tape.only = function(description, run) {
  return _.only(description, wrap(run));
};

var testProto = _.Test.prototype;

testProto.deepEqual
= testProto.deepEquals
= testProto.isEquivalent
= testProto.same
= function (a, b, msg, extra) {
  this._assert(deepEql(a, b), {
    message : msg || 'should be equivalent',
    operator : 'deepEqual',
    actual : a,
    expected : b,
    extra : extra
  });
};

testProto.notDeepEqual
= testProto.notEquivalent
= testProto.notDeeply
= testProto.notSame
= testProto.isNotDeepEqual
= testProto.isNotDeeply
= testProto.isNotEquivalent
= testProto.isInequivalent
= function (a, b, msg, extra) {
  this._assert(!deepEql(a, b), {
    message : msg || 'should not be equivalent',
    operator : 'notDeepEqual',
    actual : a,
    notExpected : b,
    extra : extra
  });
};

module.exports = tape;
