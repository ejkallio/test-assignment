import isEmpty from './isEmpty.js';

// Real imports only needed for constructing values
// (not mocking internal helpers used by isEmpty)
import isArguments from './isArguments.js';

describe('isEmpty', () => {
  //
  // ------------------------
  // NULL & PRIMITIVES
  // ------------------------
  //
  test('returns true for null or undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns true for booleans, numbers, bigints, symbols', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(123)).toBe(true);
    expect(isEmpty(BigInt(10))).toBe(true);
    expect(isEmpty(Symbol())).toBe(true);
  });

  //
  // ------------------------
  // STRINGS
  // ------------------------
  //
  test('strings: empty string returns true, non-empty returns false', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('abc')).toBe(false);
  });

  //
  // ------------------------
  // ARRAYS & ARRAY-LIKE
  // ------------------------
  //
  test('arrays: empty array returns true, non-empty returns false', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('arguments objects: empty returns true, non-empty returns false', () => {
    function getArgs() {
      return arguments;
    }

    const emptyArgs = getArgs();
    const nonEmptyArgs = getArgs(1, 2, 3);

    expect(isArguments(emptyArgs)).toBe(true);
    expect(isEmpty(emptyArgs)).toBe(true);

    expect(isArguments(nonEmptyArgs)).toBe(true);
    expect(isEmpty(nonEmptyArgs)).toBe(false);
  });

  test('jQuery-style array-like objects with length', () => {
    const emptyLike = { length: 0, 0: 'nope' };
    const nonEmptyLike = { length: 1, 0: 'hi' };

    expect(isEmpty(emptyLike)).toBe(true);
    expect(isEmpty(nonEmptyLike)).toBe(false);
  });

  test('array-like object but not true array-like (no length)', () => {
    const obj = { 0: 'x' };
    expect(isEmpty(obj)).toBe(false); // has own property
  });

  //
  // ------------------------
  // BUFFERS & TYPED ARRAYS
  // ------------------------
  //
  test('Buffer: empty returns true, non-empty returns false', () => {
    const emptyBuf = Buffer.from([]);
    const nonEmptyBuf = Buffer.from([1, 2, 3]);

    expect(isEmpty(emptyBuf)).toBe(true);
    expect(isEmpty(nonEmptyBuf)).toBe(false);
  });

  test('typed arrays (Uint8Array, Float32Array, etc.)', () => {
    expect(isEmpty(new Uint8Array([]))).toBe(true);
    expect(isEmpty(new Uint8Array([1]))).toBe(false);

    expect(isEmpty(new Float32Array([]))).toBe(true);
    expect(isEmpty(new Float32Array([0.5]))).toBe(false);
  });

  //
  // ------------------------
  // MAPS & SETS
  // ------------------------
  //
  test('maps: empty returns true, non-empty returns false', () => {
    const emptyMap = new Map();
    const nonEmptyMap = new Map([['a', 1]]);

    expect(isEmpty(emptyMap)).toBe(true);
    expect(isEmpty(nonEmptyMap)).toBe(false);
  });

  test('sets: empty returns true, non-empty returns false', () => {
    const emptySet = new Set();
    const nonEmptySet = new Set([1]);

    expect(isEmpty(emptySet)).toBe(true);
    expect(isEmpty(nonEmptySet)).toBe(false);
  });

  //
  // ------------------------
  // OBJECTS
  // ------------------------
  //
  test('plain objects: empty returns true, non-empty returns false', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test('objects with inherited properties are considered empty', () => {
    const parent = { a: 1 };
    const child = Object.create(parent); // no own properties
    expect(isEmpty(child)).toBe(true);
  });

  test('objects with non-enumerable own properties are considered empty', () => {
    const obj = {};
    Object.defineProperty(obj, 'x', {
      value: 1,
      enumerable: false
    });

    // hasOwnProperty won't catch it because it's non-enumerable
    expect(isEmpty(obj)).toBe(true);
  });

  test('objects with enumerable own properties are not empty', () => {
    const obj = {};
    Object.defineProperty(obj, 'x', {
      value: 1,
      enumerable: true
    });

    expect(isEmpty(obj)).toBe(false);
  });

  //
  // ------------------------
  // PROTOTYPE OBJECTS
  // ------------------------
  //
  test('prototype objects: empty prototype returns true', () => {
    function Foo() {}
    expect(isEmpty(Foo.prototype)).toBe(true);
  });

  test('prototype objects: prototype with own keyed properties returns false', () => {
    function Foo() {}
    Foo.prototype.x = 1;
    expect(isEmpty(Foo.prototype)).toBe(false);
  });

  //
  // ------------------------
  // FUNCTIONS
  // ------------------------
  //
  test('functions are considered empty (no own enumerable props)', () => {
    function fn() {}
    expect(isEmpty(fn)).toBe(true);
  });

  test('functions with enumerable own properties are not empty', () => {
    function fn() {}
    fn.x = 1;
    expect(isEmpty(fn)).toBe(false);
  });

});
