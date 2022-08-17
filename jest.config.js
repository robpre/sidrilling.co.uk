const nextJest = require("next/jest");
const tsconfig = require("./tsconfig.json");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const makeRegex = (paths) => {
  const output = {};

  Object.entries(paths).forEach(([key, val]) => {
    val = Array.isArray(val) ? val[0] : val;

    val = val.replace(/\*/, "$1").replace("./", "<rootDir>/");

    output[`^${key.replace(/\*/g, "(.*)")}$`] = val;
  });

  return output;
};

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    ...makeRegex(tsconfig.compilerOptions.paths),
  },
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
