var _ = require("tape");

function wrap(run) {
  return function(test) {
    new Promise(function(resolve) {
      resolve(run(test));
    }).then(
      function() { test.end(); },
      function(error) { test.end(error || new Error("rejected")); }
    );
  };
}

function tape(description, run) {
  return _(description, wrap(run));
};

Object.assign(tape, _);

tape.skip = function(description, run) {
  return _.skip(description, wrap(run));
};

tape.only = function(description, run) {
  return _.only(description, wrap(run));
};

module.exports = tape;
