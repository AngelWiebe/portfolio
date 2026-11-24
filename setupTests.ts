import '@testing-library/jest-dom/vitest';

// Polyfill for matchMedia
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  };
};
