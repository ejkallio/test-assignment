import ceil from './ceil.js';

describe('ceil', () => {
  // --- Basic functionality ---
  test('rounds up to the nearest integer by default', () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(4)).toBe(4);
    expect(ceil(4.0001)).toBe(5);
    expect(ceil(-4.006)).toBe(-4); // because -4 is greater than -4.006
    expect(ceil(-4.0001)).toBe(-4);
  });

  // --- Precision: positive values ---
  test('rounds up with positive precision', () => {
    expect(ceil(6.004, 2)).toBe(6.01);
    expect(ceil(1.234, 1)).toBe(1.3);
    expect(ceil(1.01, 2)).toBe(1.01); // already at precision
    expect(ceil(9.999, 2)).toBe(10.0);
  });

  // --- Precision: negative values ---
  test('rounds up with negative precision', () => {
    expect(ceil(6040, -2)).toBe(6100);
    expect(ceil(149, -1)).toBe(150);
    expect(ceil(1001, -3)).toBe(2000);
    expect(ceil(-149, -1)).toBe(-140); // -140 is the smallest integer >= -149 with -1 precision
  });

  // --- Zero precision explicitly passed ---
  test('treats precision = 0 the same as default', () => {
    expect(ceil(4.006, 0)).toBe(5);
    expect(ceil(4.5, 0)).toBe(5);
  });

  // --- Handling non-number inputs ---
  test('returns NaN for non-numeric values', () => {
    expect(ceil('abc')).toBeNaN();
    expect(ceil(undefined)).toBeNaN();
    expect(ceil(null)).toBe(0);
    expect(ceil(NaN)).toBeNaN();
  });

  // --- Handling extremely large and small numbers ---
  test('handles very large numbers', () => {
    expect(ceil(1e12 + 0.1)).toBe(1e12 + 1);
    expect(ceil(-1e12 - 0.1)).toBe(-1e12);
  });

  test('handles very small floating point values', () => {
    expect(ceil(0.0000001, 10)).toBe(0.0000001);
    expect(ceil(0.00000001, 10)).toBe(0.00000001);
    expect(ceil(0.00000009, 8)).toBe(0.00000009); 
  });

  // --- Edge cases ---
  test('handles Infinity and -Infinity', () => {
    expect(ceil(Infinity)).toBe(Infinity);
    expect(ceil(-Infinity)).toBe(-Infinity);
  });

  test('handles -0 correctly', () => {
    const result = ceil(-0);
    expect(Object.is(result, -0)).toBe(true); // preserves -0
  });

  // --- Precision edge cases ---
  test('treats extreme precision according to implementation (no clamping)', () => {
    expect(ceil(1.2345, 100)).toBe(1.2345);     // small number, precision has no effect
    expect(ceil(1.2345, -100)).toBeCloseTo(1e100); // extremely large magnitude
  });

  // --- Known examples from documentation ---
  test('matches documentation examples', () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(6.004, 2)).toBe(6.01);
    expect(ceil(6040, -2)).toBe(6100);
  });
});
