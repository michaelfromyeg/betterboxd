export default {
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],  
    '^.+\\.mjs$': 'ts-jest',                     
  },
  testEnvironment: 'node',                        
  extensionsToTreatAsEsm: ['.ts'],                
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/scripts/'],
};
