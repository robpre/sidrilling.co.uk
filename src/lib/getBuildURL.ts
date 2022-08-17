import { createHash } from "crypto";
import { BRANCH_NAME, BASE_URL } from "@/config";

const sha256 = (s: string) => {
  const h = createHash("sha256");

  h.update(s);

  return h.digest().toString("base64");
};

export const getBuildURL = () => {
  if (BASE_URL) {
    return BASE_URL;
  }

  if (!BRANCH_NAME || BRANCH_NAME === "main") {
    return "https://www.sidrilling.co.uk";
  }

  const projectName = "sidrillingcouk";
  const prefix = "git";

  const branchName = BRANCH_NAME.replace(/[^a-z0-9]+/g, "-");
  const scope = "robpre";

  // https://vercel.com/docs/concepts/deployments/generated-urls#url-with-git-branch
  // <project-name>-git-<branch-name>-<scope-slug>.vercel.app
  let subdomain = [projectName, prefix, branchName, scope].join("-");

  // https://vercel.com/docs/concepts/deployments/generated-urls#truncation
  if (subdomain.length > 63) {
    // example truncated url
    // my-project-git-this-is-really-an-extremely-long-bra-ar63fm-acme.vercel.app
    const hash = sha256(prefix + BRANCH_NAME + projectName).slice(0, 6);
    const hlen = hash.length + 1;
    // make subdomain + the hash and the hash sep "-" less than 64
    const longByLength = subdomain.length + hlen - 63;

    subdomain = [
      projectName,
      prefix,
      branchName.slice(0, -longByLength),
      hash,
      scope,
    ].join("-");
  }

  return `https://${subdomain}.vercel.app`;
};
