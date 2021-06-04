import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class DocumentWithLightTheme extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
