import { AuthorizationCode } from "simple-oauth2";
import { getAuth } from "@/config";
import { NextApiHandler } from "next";
import { getBuildURL } from "@/lib/getBuildURL";
import { singleJoiningSlash } from "@/lib/singleJoiningSlash";

const callback: NextApiHandler = async (req, res) => {
  const url = new URL(singleJoiningSlash(getBuildURL(), req.url || ""));
  const code = url.searchParams.get("code");

  if (!code) {
    res.statusCode = 400;
    res.end(renderBody("error", "missing code in query params"));
    return;
  }

  const client = new AuthorizationCode(getAuth());
  const tokenParams = {
    code,
    redirect_uri: singleJoiningSlash(getBuildURL(), "api/auth/callback"),
  };

  try {
    const accessToken = await client.getToken(tokenParams);
    const token = accessToken.token["access_token"];

    const responseBody = renderBody("success", {
      token,
    });

    res.statusCode = 200;
    res.end(responseBody);
  } catch (e) {
    res.statusCode = 500;
    res.end(
      renderBody(
        "error",
        e instanceof Error
          ? e
          : new Error(typeof e === "string" ? e : "unknown error type")
      )
    );
  }
};

const extractMessage = (e: Error | string | object) => {
  if (typeof e === "string") {
    return e;
  }

  if ("message" in e && typeof e.message === "string") {
    e = { message: e.message };
  }

  return JSON.stringify(e);
};

function renderBody(
  status: "success" | "error",
  content: string | { token?: "string" } | Error
) {
  return `
    <script>
      function receiveMessage() {
        window.opener.postMessage(
          'authorization:github:${status}:${extractMessage(content)}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
}

export default callback;
