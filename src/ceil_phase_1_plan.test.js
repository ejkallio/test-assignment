import ceil from './ceil.js'

test('1.05 = 2', () => {
    expect(ceil(1.05)).toBe(2);
})

test('5.2694, 2 = 5.27', () => {
    expect(ceil(5.2694, 2)).toBe(5.27);
})

test('1254, -2 = 1200', () => {
    expect(ceil(1254, -2)).toBe(1300);
})

test('5.421, 4 = 5.421', () => {
    expect(ceil(5.421, 4)).toBe(5.421);
})

test('2640, -5 = 3000', () => {
    expect(ceil(2640, -5)).toBe(3000);
})

ceil('test with empty value', () => {
    expect(ceil()).toBe(0);
})