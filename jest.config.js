module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@shared(.*)$': '<rootDir>/shared/$1',
    '^@constants(.*)$': '<rootDir>/constants$1',
    '^@filters(.*)$': '<rootDir>/filters$1',
    '^@guards(.*)$': '<rootDir>/guards$1',
    '^@interfaces(.*)$': '<rootDir>/interfaces$1',
    '^@pipes(.*)$': '<rootDir>/pipes$1',
    '^@interceptors(.*)$': '<rootDir>/interceptors$1',
    '^@decorators(.*)$': '<rootDir>/decorators$1',
    '^@exceptions(.*)$': '<rootDir>/exceptions$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@modules(.*)$': '<rootDir>/modules$1',
  },

  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
