// jest.config.js
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/docs/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
};