// Prompt to ChatGPT: Can you initialize a test suite with unit test to this component? import upperFirst from './upperFirst.js' import toString from './toString.js' /** * Converts the first character of string to upper case and the remaining * to lower case. * * @since 3.0.0 * @category String * @param {string} [string=''] The string to capitalize. * @returns {string} Returns the capitalized string. * @example * * capitalize('FRED') * // => 'Fred' */ const capitalize = (string) => upperFirst(toString(string).toLowerCase()) export default capitalize The software uses react and jest. Software is an e-commerce webstore.

import capitalize from './capitalize.js';
import upperFirst from './upperFirst.js';
import toString from './toString.js';

// Mock helpers to ensure capitalize delegates correctly
jest.mock('./upperFirst.js', () => jest.fn((str) => `UF:${str}`));
jest.mock('./toString.js', () => jest.fn((value) => String(value)));

describe('capitalize', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('capitalizes a fully uppercase word', () => {
    upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));
    toString.mockImplementation((v) => String(v));

    expect(capitalize('FRED')).toBe('Fred');
  });

  it('capitalizes a lowercase word', () => {
    upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));

    expect(capitalize('fred')).toBe('Fred');
  });

  it('capitalizes a mixed-case word', () => {
    upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));

    expect(capitalize('fReD')).toBe('Fred');
  });

  it('handles empty strings', () => {
    upperFirst.mockImplementation((str) => str);

    expect(capitalize('')).toBe('');
  });

  it('converts non-string values using toString', () => {
    upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));

    expect(capitalize(123)).toBe('123');
    expect(toString).toHaveBeenCalledWith(123);
  });

  it('delegates to upperFirst and toString correctly', () => {
    capitalize('example');

    expect(toString).toHaveBeenCalledWith('example');
    expect(upperFirst).toHaveBeenCalled();
  });

  it('capitalizes multi-word strings only at the start', () => {
    upperFirst.mockImplementation((str) => str[0].toUpperCase() + str.slice(1));

    expect(capitalize('hello world')).toBe('Hello world');
  });
});
