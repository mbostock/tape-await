# tape-await

A synchronous test without *test*.end:

```js
tape("42 is a number", test => {
  test.equal(typeof 42, "number");
});
```

A synchronous test that throws an error which is treated as a failure:

```js
tape("errors are failures", test => {
  throw new Error("fail");
});
```

An asynchronous test:

```js
tape("promises are great", async test => {
  await new Promise(resolve => setTimeout(resolve, 250));
  test.ok(true);
});
```

This module is similar to [tape-async](https://www.npmjs.org/package/tape-async), [tape-promise](https://www.npmjs.org/package/tape-promise), and [blue-tape](https://www.npmjs.org/package/blue-tape). One difference is that it *also* provides implicit *test*.end for synchronous tests, rather than only providing it for asynchronous tests. Also, it only supports promises, not generators, and doesn’t attempt to deal with unhandled errors.
