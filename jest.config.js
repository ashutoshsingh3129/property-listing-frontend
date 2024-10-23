module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest",  // Ensure you're transforming JS files with babel-jest
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)"  // Allow transformation of axios (or other modules using ES modules)
    ],
  };
  