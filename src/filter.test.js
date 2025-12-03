import filter from './filter.js'

test('returns empty array when no items match', () => {
  expect(filter(users, () => false)).toEqual([]);
});

test('returns empty array when predicate always false', () => {
  expect(filter(users, ({ active }) => active === 'not-a-boolean')).toEqual([]);
});

test('works with numbers', () => {
  const arr = [1, 2, 3, 4];
  expect(filter(arr, (n) => n % 2 === 0)).toEqual([2, 4]);
});

test('works with empty array', () => {
  expect(filter([], () => true)).toEqual([]); // Pitäisikö tulla pelkästään [] eikä [[]]?
});

test('passes correct arguments to predicate', () => {
  const mock = vi.fn(() => true);
  const arr = ['a', 'b'];
  filter(arr, mock);

  expect(mock).toHaveBeenCalledTimes(2);
  expect(mock).toHaveBeenNthCalledWith(1, 'a', 0, arr);
  expect(mock).toHaveBeenNthCalledWith(2, 'b', 1, arr);
});
