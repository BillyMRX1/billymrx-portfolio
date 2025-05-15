/** @type {import('jest').Config} */
module.exports = {
  // preset: 'ts-jest', // Removed ts-jest preset as we'll use swc
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp|avif)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library/react|@testing-library/dom|@testing-library/user-event)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: { '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }] },

}

