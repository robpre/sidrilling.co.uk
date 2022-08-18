import { useEffect } from "react";

import { config } from "@/lib/netlifyConfig";

interface NetlifyWindow extends Window {
  CMS_MANUAL_INIT?: boolean;
  CMS?: any;
}

declare const window: NetlifyWindow;

export default () => {
  useEffect(() => {
    (async () => {
      // This global flag enables manual initialization.
      window.CMS_MANUAL_INIT = true;
      const { default: CMS } = await import("netlify-cms-app");

      CMS.init({ config });
      // CMS.registerPreviewTemplate("index-page", (props) => {
      //   console.log(props);
      //   return null;
      // });
    })();
  }, []);

  return null;
};
