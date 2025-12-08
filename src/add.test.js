import add from './add.js';

describe('add()', () => {
  describe('basic numeric addition', () => {
    test('adds positive numbers', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(10000, 20000)).toBe(30000);
    });

    test('adds negative and positive numbers', () => {
      expect(add(-1, 1)).toBe(0);
      expect(add(-10, -5)).toBe(-15);
    });

    test('adds zeros', () => {
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('string-to-number coercion', () => {
    test('converts numeric strings to numbers', () => {
      expect(add('1', 1)).toBe(2);
      expect(add('10', '5')).toBe(15);
    });

    test('non-numeric string returns default behavior (returns second value)', () => {
      expect(add('foo', 5)).toBe(5);
    });
  });

  describe('undefined / null handling', () => {
    test('undefined augend returns addend', () => {
      expect(add(undefined, 5)).toBe(5);
    });

    test('undefined addend returns augend', () => {
      expect(add(5, undefined)).toBe(5);
    });

    test('null acts like 0 (numeric coercion)', () => {
      expect(add(null, 5)).toBe(5);
      expect(add(5, null)).toBe(5);
    });
  });

  describe('special number cases', () => {
    test('NaN results in NaN', () => {
      expect(add(NaN, 1)).toBeNaN();
      expect(add(1, NaN)).toBeNaN();
    });

    test('large numbers are handled correctly', () => {
      expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
    });
  });

  describe('object and array handling', () => {
    test('adding array coerces [] to 0 but non-empty array to NaN', () => {
      expect(add([], 3)).toBe(3);             // [] → 0
      expect(add([1,2], 3)).toBeNaN();        // [1,2] → NaN
    });
  });
});