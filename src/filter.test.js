import filter from './filter.js'

const users = [
    { 'user': 'barney', 'active': true },
    { 'user': 'fred',   'active': false }
  ]

test('Initiliaze array from words', () => {
  expect(filter(users, ({ active }) => active)).toEqual([{ 'user': 'barney', 'active': true }]); 
});