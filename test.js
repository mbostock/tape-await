var tape = require("./");

tape("a successful synchronous test succeeds", function(test) {
  test.ok(true);
});

tape.skip("an unsuccessful synchronous test fails", function(test) {
  test.ok(true);
  throw new Error("fail");
});

tape("an successful asynchronous test succeeds", function(test) {
  return new Promise(function(resolve) {
    test.ok(true);
    setTimeout(resolve, 250);
  });
});

tape.skip("an unsuccessful asynchronous test fails", function(test) {
  return new Promise(function(resolve, reject) {
    test.ok(true);
    setTimeout(reject, 250);
  });
});

tape("two empty arrays with different lengths are not deepEqual", function(test) {
  var a = [];
  var b = new Array();
  var c = new Array(101);
  test.deepEqual(a, b);
  test.notDeepEqual(a, c);
});
