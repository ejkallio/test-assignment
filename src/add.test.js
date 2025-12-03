import add from './add.js';

test('1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('10000 + 20000 to equal 3', () => {
  expect(add(10000, 20000)).toBe(30000);
});

test('-1 + 1 to equal 0', () => {
  expect(add(-1,1)).toBe(0);
});

test('0 + 0 to equal 0', () => {
  expect(add(0,0)).toBe(0);
});

test('string 1 + 1 to equal error', () => { // feature?
  expect(add('1',1)).toBe(null);
});