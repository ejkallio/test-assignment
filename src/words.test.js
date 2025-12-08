import words from './words.js';

describe('words()', () => {

  test('splits a comma-separated list into clean words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  test('keeps alphanumeric words intact (feature)', () => {
    // Tämä EI ole bugi, koska words() määrittelee sanan alfanumeeriseksi
    expect(words('Aku10, Elias15, & testauskurssi20')).toEqual([
      'Aku10',
      'Elias15',
      'testauskurssi20'
    ]);
  });

  test('handles Scandinavian characters and Unicode words', () => {
    expect(words('Äku, Ölli, and Zeus')).toEqual(['Äku', 'Ölli', 'and', 'Zeus']);
  });

  test('splits a simple space-separated search query into words', () => {
    expect(words('White summer sneakers')).toEqual(['White', 'summer', 'sneakers']);
  });

  test('returns empty array when given an empty string', () => {
    expect(words('')).toEqual([]);
  });

  test('returns empty array when string contains only punctuation', () => {
    expect(words('!!!,,,&///')).toEqual([]);
  });

  test('supports custom RegExp patterns', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual([
      'fred',
      'barney',
      '&',
      'pebbles'
    ]);
  });

  test('handles mixed unicode, digits and punctuation', () => {
    expect(words('Hämähäkki123 & 🦊fox99')).toEqual(['Hämähäkki123', 'fox99']);
  });

  test('ignores extra whitespace between words', () => {
    expect(words('   hello    world   ')).toEqual(['hello', 'world']);
  });

});
