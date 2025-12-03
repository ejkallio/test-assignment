import capitalize from "./capitalize";

//Täytyykö testata myös upperfirst funktio, koska capitalize käyttää sitä?

test('capitalize lowercase "test"', () => {
  expect(capitalize('test')).toBe('Test');
});

test('capitalize the first char and lowercase rest of the string "TEST"', () => {
  expect(capitalize('TEST')).toBe('Test');
});

test('Capitalize string "tEST"', () => {
  expect(capitalize('tEST')).toBe('Test'); 
});

test('Capitalize string "Test"', () => {
  expect(capitalize('Test')).toBe('Test'); 
});

test('Capitalize without parameter', () => { // bug or feature?
  expect(capitalize()).toBe(null); 
});

test('Capitalize string "t3St1nG#"', () => {
  expect(capitalize('t3St1nG#')).toBe('T3st1ng#'); 
});