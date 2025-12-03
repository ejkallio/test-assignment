import endsWith from "./endsWith";
//Checks if `string` ends with the given target string.

test('string image.jpg ends with ".jpg"',() => {
  expect(endsWith('image.jpg','.jpg')).toBe(true);
});

test('string document.pdf does not end with ".jpg"',() => {
  expect(endsWith('document.pdf','.jpg')).toBe(false);
});

test('string test ends with t',() => {
  expect(endsWith('test','t')).toBe(true);
});

test('testÄ ends with Ä',() => {
  expect(endsWith('testÄ','Ä')).toBe(true);
});

test('test10 ends with 10',() => {
  expect(endsWith('test10','10')).toBe(true);
});