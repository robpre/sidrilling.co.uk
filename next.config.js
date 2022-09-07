// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL || "",
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF || "",
    NOW_GITHUB_COMMIT_REF: process.env.NOW_GITHUB_COMMIT_REF || "",
  },
  // While in a branch we need to match the vercel config
  distDir: "build",
};

module.exports = nextConfig;
