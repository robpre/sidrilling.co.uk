import { NextApiHandler } from "next";
import { AuthorizationCode } from "simple-oauth2";
import { randomBytes } from "crypto";

import { getAuth, OAUTH_SCOPE } from "@/config";

export const randomString = () => randomBytes(4).toString("hex");

const authHandler: NextApiHandler = async (req, res) => {
  const { host } = req.headers;
  const url = new URL(`https://${host}/${req.url}`);

  const client = new AuthorizationCode(getAuth());

  const authorizationUri = client.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: OAUTH_SCOPE,
    state: randomString(),
  });

  res.writeHead(302, { Location: authorizationUri });
  res.end();
};

export default authHandler;
