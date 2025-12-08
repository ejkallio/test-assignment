export default {
  transform: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/add.js',
    'src/filter.js',
    'src/words.js',
    'src/capitalize.js',
    'src/endsWith.js',
    'src/eq.js',
    'src/reduce.js',
    'src/isEmpty.js',
    'src/get.js',
    'src/ceil.js',
    'src/.js',
  ]
};
