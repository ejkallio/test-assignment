import capitalize from './capitalize.js';
import upperFirst from './upperFirst.js';
import toString from './toString.js';

// Mock helpers to ensure capitalize delegates correctly
jest.mock('./upperFirst.js', () => jest.fn((str) => `UF:${str}`));
jest.mock('./toString.js', () => jest.fn((value) => String(value)));

test('capitalize lowercase "test"', () => {
  upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
  toString.mockImplementation((v) => String(v));

  expect(capitalize('test')).toBe('Test');
});

test('capitalize the first char and lowercase rest of the string "TEST"', () => {
  upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
  toString.mockImplementation((v) => String(v));

  expect(capitalize('TEST')).toBe('Test');
});

test('Capitalize string "tEST"', () => {
  upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
  toString.mockImplementation((v) => String(v));

  expect(capitalize('tEST')).toBe('Test');
});

test('Capitalize string "Test"', () => {
  upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
  toString.mockImplementation((v) => String(v));

  expect(capitalize('Test')).toBe('Test');
});

test('Capitalize without parameter', () => { // bug or feature?
  upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
  toString.mockImplementation((v) => String(v));

  expect(capitalize()).toBe(null);
});

test('Capitalize string "t3St1nG#"', () => {
  upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
  toString.mockImplementation((v) => String(v));

  expect(capitalize('t3St1nG#')).toBe('T3st1ng#');
});