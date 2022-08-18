import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

import "../css/styles.scss";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        {/* {{! start favicon spam }} */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicons/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicons/favicon-16x16.png"
          sizes="16x16"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#9cbd35"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#165f32" />
        {/* {{! end favicon spam }} */}
      </Head>
      <div
        className={
          asPath.startsWith("/admin")
            ? "sidrilling_admin"
            : "sidrilling_notadmin"
        }
      >
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default CustomApp;
