import eq from './eq.js'

const object = { 'a': 1 };
const other = { 'a': 1 };

// Numbers
test('number 1 equals number 1', () => {
  expect(eq(1, 1)).toBe(true);
});

test('number 1 does not equal number 2', () => {
  expect(eq(1, 2)).toBe(false);
});
 
test('number 1.1 does equal 1.1', () => {
  expect(eq(1.1, 1.1)).toBe(true);
});

test('number 1.2 does not equal 1.1', () => {
  expect(eq(1.2, 1.1)).toBe(false);
});

// Strings
test('string "1" equals string "1"', () => {
  expect(eq("1", "1")).toBe(true);
});

test('string "1" does not equal string "2"', () => {
  expect(eq("1", "2")).toBe(false);
});

// Objects
test('object x does not equal object y', () => {
  expect(eq(object, other)).toBe(false);
});

test('object x equals object x', () => {
  expect(eq(object, object)).toBe(true);
});

// NaN
test('NaN equals NaN', () => {
  expect(eq(NaN, NaN)).toBe(true);
});

test('NaN does not equal string "1"', () => {
  expect(eq(NaN, "1")).toBe(false);
});

test('NaN does not equal number 1', () => {
  expect(eq(NaN, 1)).toBe(false);
});

test('null equals null', () => {
  expect(eq(null, null)).toBe(true);
});
