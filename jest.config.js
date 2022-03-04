module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**", "!./src/client/**/*.js"],
  coverageReporters: ["lcov", "text"],
  transformIgnorePatterns: ["/node_modules/(?!@boots).*/"],
  setupFiles: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|scss|svg)$": "identity-obj-proxy",
  },
};
