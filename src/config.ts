export const OAUTH_SCOPE = "repo,user";

const mustenv = (s: string): string => {
  const val = process.env[s];

  if (!val) {
    throw new Error(`Missing process.env.${s}`);
  }

  return val;
};

export const getAuth = () => ({
  client: {
    id: mustenv("OAUTH_GITHUB_CLIENT_ID"),
    secret: mustenv("OAUTH_GITHUB_CLIENT_SECRET"),
  },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
  },
});

export const BASE_URL = process.env.BASE_URL;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const BRANCH_NAME =
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.NOW_GITHUB_COMMIT_REF ||
  "nextjs-vercel-netlify";
