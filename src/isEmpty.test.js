import isEmpty from './isEmpty.js';

describe('isEmpty', () => {

  test('returns true for null or undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns true for primitive values without length', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(42)).toBe(true);
  });

  test('empty string is empty', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('non-empty string is not empty', () => {
    expect(isEmpty('abc')).toBe(false);
  });

  test('empty array is empty', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('non-empty array is not empty', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('empty arguments object is empty', () => {
    function fn() { return isEmpty(arguments); }
    expect(fn()).toBe(true);
  });

  test('non-empty arguments object is not empty', () => {
    function fn() { return isEmpty(arguments); }
    expect(fn(1, 2)).toBe(false);
  });

  test('empty typed array is empty', () => {
    expect(isEmpty(new Uint8Array())).toBe(true);
  });

  test('non-empty typed array is not empty', () => {
    expect(isEmpty(new Uint8Array([1,2,3]))).toBe(false);
  });

  test('empty buffer is empty', () => {
    expect(isEmpty(Buffer.from([]))).toBe(true);
  });

  test('non-empty buffer is not empty', () => {
    expect(isEmpty(Buffer.from([1,2,3]))).toBe(false);
  });

  test('empty Map or Set is empty', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  test('non-empty Map or Set is not empty', () => {
    const map = new Map([['a', 1]]);
    const set = new Set([1]);
    expect(isEmpty(map)).toBe(false);
    expect(isEmpty(set)).toBe(false);
  });

  test('empty object is empty', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('non-empty object is not empty', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test('object with prototype keys only is empty', () => {
    function Foo() {}
    Foo.prototype.bar = 1;
    const obj = new Foo();
    expect(isEmpty(obj)).toBe(true);
  });

  test('nested cart items object', () => {
    const cart = { items: [] };
    expect(isEmpty(cart.items)).toBe(true);
    cart.items.push({ id: 1 });
    expect(isEmpty(cart.items)).toBe(false);
  });

  test('object with inherited properties but no own properties', () => {
    const proto = { x: 1 };
    const obj = Object.create(proto);
    expect(isEmpty(obj)).toBe(true);
  });

  test('object with own enumerable properties is not empty', () => {
    const obj = Object.create({ x: 1 });
    obj.y = 2;
    expect(isEmpty(obj)).toBe(false);
  });
});