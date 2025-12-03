import words from './words.js';

test('Initiliaze array from words', () => {
  expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']); 
});

test('Initiliaze array from words with numbers', () => {
  expect(words('Aku10, Elias15, & testauskurssi20')).toEqual(['Aku10', 'Elias15', 'testauskurssi20']); // bug or feature?
});

test('Initiliaze array from words with Ä, Ö and Z', () => {
  expect(words('Äku, Ölli, and Zeus')).toEqual(['Äku', 'Ölli','and', 'Zeus']);
});

test('Initiliaze array from example of search input', () => {
  expect(words('White summer sneakers')).toEqual(['White','summer','sneakers']); 
});
