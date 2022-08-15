import { AuthorizationCode } from "simple-oauth2";
import { oauth } from "@config";

export default async (req, res) => {
  const { host } = req.headers;
  const url = new URL(`https://${host}/${req.url}`);
  const urlParams = url.searchParams;
  const code = urlParams.get("code");
  const client = new AuthorizationCode(oauth);
  const tokenParams = {
    code,
    redirect_uri: `https://${host}/api/callback`,
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
    res.statusCode = 200;
    res.end(renderBody("error", e));
  }
};

function renderBody(status, content) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:${content.provider}:${status}:${JSON.stringify(
    content
  )}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:${content.provider}", "*");
    </script>
  `;
}
