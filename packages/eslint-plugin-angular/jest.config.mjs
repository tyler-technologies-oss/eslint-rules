/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: './src/.+\\.test\\.ts$',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleFileExtensions: ['ts', 'js', 'node'],
  coverageReporters: ['text-summary', 'lcov'],
};
