// setupTests.ts
import '@testing-library/jest-dom'; // If you haven't done this yet, ensure jest-dom is imported for custom matchers

// Polyfill for matchMedia
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};
