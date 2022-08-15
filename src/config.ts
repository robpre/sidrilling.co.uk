export const OAUTH_SCOPE = "repo,user";

export const oauth = {
  client: {
    id: process.env.OAUTH_GITHUB_CLIENT_ID,
    secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
  },
};

export const HOST_DOMAIN = process.env.HOST_DOMAIN || "sidrilling.co.uk";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const BRANCH_NAME =
  process.env.VERCEL_GIT_COMMIT_REF || "nextjs-vercel-netlify";
