import get from './get.js';

describe('get (integration with baseGet)', () => {

  test('gets nested value using string path', () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, 'a[0].b.c')).toBe(3);
  });

  test('gets nested value using array path', () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, ['a', '0', 'b', 'c'])).toBe(3);
  });

  test('supports simple dot path', () => {
    const object = { a: { b: 10 } };
    expect(get(object, 'a.b')).toBe(10);
  });

  test('returns defaultValue when resolved value is undefined', () => {
    const object = { a: {} };
    expect(get(object, 'a.b', 'default')).toBe('default');
  });

  test('does not use defaultValue when resolved value is null', () => {
    const object = { a: { b: null } };
    expect(get(object, 'a.b', 'default')).toBeNull();
  });

  test('does not use defaultValue when resolved value is false', () => {
    const object = { a: { b: false } };
    expect(get(object, 'a.b', 'default')).toBe(false);
  });

  test('does not use defaultValue when resolved value is 0', () => {
    const object = { a: { b: 0 } };
    expect(get(object, 'a.b', 'default')).toBe(0);
  });

  test('returns defaultValue when object is null', () => {
    expect(get(null, 'a.b', 'default')).toBe('default');
  });

  test('returns defaultValue when object is undefined', () => {
    expect(get(undefined, 'a.b', 'default')).toBe('default');
  });

  test('returns undefined when object is null and no defaultValue is provided', () => {
    expect(get(null, 'a.b')).toBeUndefined();
  });

  test('returns defaultValue for missing deep path', () => {
    const object = { a: 1 };
    expect(get(object, 'a.b.c', 'missing')).toBe('missing');
  });

  test('returns undefined when missing path and no defaultValue', () => {
    const object = { a: 1 };
    expect(get(object, 'a.b.c')).toBeUndefined();
  });

  test('supports empty string path', () => {
    const object = { '': 42 };
    expect(get(object, '', 'default')).toBe(42);
  });

  test('supports empty array path (returns the object)', () => {
    const object = { a: 5 };
    expect(get(object, [], 'default')).toBe(object);
  });

  test('handles numeric keys correctly', () => {
    const object = { a: { 1: { b: 7 } } };
    expect(get(object, 'a.1.b')).toBe(7);
    expect(get(object, ['a', '1', 'b'])).toBe(7);
  });

  test('handles bracket notation with quotes', () => {
    const object = { a: { 'b.c': 10 } };
    expect(get(object, `a["b.c"]`)).toBe(10);
  });

  test('does not treat defaultValue undefined as override', () => {
    const object = { a: { b: 'value' } };
    expect(get(object, 'a.b', undefined)).toBe('value');
  });

  test('returns undefined if property exists but value is undefined and no default provided', () => {
    const object = { a: { b: undefined } };
    expect(get(object, 'a.b')).toBeUndefined();
  });
});
