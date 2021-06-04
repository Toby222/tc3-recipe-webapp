import React from "react";

import "../styles/style.css";

import App from "next/app";

export default class CustomApp extends App {
  private updateTheme(dark: boolean) {
    if (dark) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }

  componentDidMount() {
    this.updateTheme(
      globalThis.window?.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  render() {
    globalThis.window
      ?.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event: MediaQueryListEvent) => {
        this.updateTheme(event.matches);
      });
    return <this.props.Component {...this.props.pageProps} />;
  }
}
