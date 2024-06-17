import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title"
          content="SpinTheBottle!"/>
      <meta name="twitter:description"
          content="SpinTheBottle!"/>
      <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1774950959443263489/qh2i5uVO_400x400.jpg"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
