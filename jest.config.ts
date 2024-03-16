import type { Config } from '@jest/types';

const baseDir = '<rootDir>';
const baseTestDir = '<rootDir>/test';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/unitTestingTask.js`],
  testMatch: [`${baseTestDir}/unitTestingTask.test.ts`],
};

export default config;
