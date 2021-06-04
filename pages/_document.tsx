import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class DocumentWithLightTheme extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <body className="light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
