module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        '^@common(.*)$': '<rootDir>/common/$1',
        '^@libs(.*)$': '<rootDir>/libs/$1',
        '^@constants(.*)$': '<rootDir>/common/constants$1',
        '^@filters(.*)$': '<rootDir>/common/filters$1',
        '^@guards(.*)$': '<rootDir>/common/guards$1',
        '^@interfaces(.*)$': '<rootDir>/common/interfaces$1',
        '^@pipes(.*)$': '<rootDir>/common/pipes$1',
        '^@interceptors(.*)$': '<rootDir>/common/interceptors$1',
        '^@decorators(.*)$': '<rootDir>/common/decorators$1',
        '^@exceptions(.*)$': '<rootDir>/common/exceptions$1',
        '^@utils(.*)$': '<rootDir>/common/utils$1',
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
