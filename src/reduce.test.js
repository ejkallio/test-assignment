import reduce from './reduce.js';

describe('reduce (integration with arrayReduce, baseReduce, baseEach)', () => {

  test('reduces an array with an explicit accumulator', () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
    expect(result).toBe(6);
  });

  test('reduces an array without an explicit accumulator', () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n);
    expect(result).toBe(6); 
  });

  test('supports different iteratee result types for arrays', () => {
    const result = reduce([1, 2, 3], (acc, n) => {
      acc.push(n * 2);
      return acc;
    }, []);
    expect(result).toEqual([2, 4, 6]);
  });

  test('works with an empty array and explicit accumulator', () => {
    const result = reduce([], (acc, n) => acc + n, 10);
    expect(result).toBe(10);
  });

  test('returns undefined for empty array without accumulator', () => {
    const result = reduce([], (acc, n) => acc + n);
    expect(result).toBeUndefined();
  });

  test('reduces an object with explicit accumulator', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = reduce(obj, (acc, value) => acc + value, 0);
    expect(result).toBe(6);
  });

  test('reduces an object without explicit accumulator', () => {
    const obj = { a: 2, b: 3, c: 4 };
    const result = reduce(obj, (acc, value) => acc + value);
    expect(result).toBe(9); 
  });

  test('iteratee receives key for object reduction', () => {
    const obj = { a: 1, b: 2 };

    const calls = [];
    reduce(obj, (acc, value, key) => {
      calls.push(key);
      return acc + value;
    }, 0);

    expect(calls).toEqual(['a', 'b']);
  });

  test('can accumulate into a new object', () => {
    const obj = { a: 1, b: 2, c: 1 };
    const result = reduce(
      obj,
      (acc, value, key) => {
        (acc[value] || (acc[value] = [])).push(key);
        return acc;
      },
      {}
    );

    expect(result).toEqual({
      1: expect.arrayContaining(['a', 'c']),
      2: ['b']
    });
  });

  test('reduces a string as an array-like collection', () => {
    const result = reduce('abc', (acc, ch) => acc + ch.toUpperCase(), '');
    expect(result).toBe('ABC');
  });

  test('reduces an arguments object', () => {
    function fn() {
      return reduce(arguments, (acc, n) => acc + n, 0);
    }
    expect(fn(1, 2, 3)).toBe(6);
  });

  test('handles null input gracefully (matches Lodash: returns undefined)', () => {
    expect(reduce(null, x => x)).toBeUndefined();
  });

  test('handles undefined input gracefully', () => {
    expect(reduce(undefined, x => x)).toBeUndefined();
  });

  test('iteratee receives correct arguments (acc, value, index/key, collection)', () => {
    const array = [10, 20];
    const calls = [];

    reduce(array, (acc, value, index, collection) => {
      calls.push([acc, value, index, collection]);
      return acc + value;
    }, 0);

    expect(calls.length).toBe(2);
    expect(calls[0][0]).toBe(0);     
    expect(calls[0][2]).toBe(0);    
    expect(calls[0][3]).toBe(array); 
  });

  test('handles a deeply nested accumulator', () => {
    const data = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = reduce(
      data,
      (acc, item) => {
        acc.total += item.x;
        acc.count++;
        return acc;
      },
      { total: 0, count: 0 }
    );

    expect(result).toEqual({ total: 6, count: 3 });
  });
});
