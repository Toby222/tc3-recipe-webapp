import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class DocumentWithLightTheme extends Document {
  render() {
    const description =
      "A web app made to navigate through Tinkers' Construct's Modifier Recipe and Language files.";
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            itemProp="name"
            content="Tinkers' Construct 3 Recipes"
          />
          <meta property="og:url" content="https://tc3.tobot.tech/" />
          <meta
            property="og:description"
            itemProp="description"
            name="description"
            content={description}
          />
          <meta name="twitter:description" content={description} />
          <link type="application/json+oembed" href="/oEmbed.json" />
          <meta name="theme-color" content="#BC9862" />
          <meta property="og:image" itemProp="image" content="/favicon.png" />
          <meta
            property="og:image:secure_url"
            itemProp="image"
            content="https://tc3.tobot.tech/favicon.png"
          />

          <meta property="og:image:width" content="128" />
          <meta property="og:image:height" content="128" />
          <meta
            property="og:image:alt"
            content="A Guide book, bound in wooden panels"
          />
        </Head>
        <body className="light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
