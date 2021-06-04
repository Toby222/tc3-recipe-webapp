import React from "react";

import "../styles/style.css";

import App from "next/app";

export default class CustomApp extends App {
  private setTheme() {
    const prefersDark: boolean =
      globalThis.window?.matchMedia("(prefers-color-scheme: dark)").matches ||
      globalThis.localStorage.getItem("prefersDark") === "true";
    document.body.classList.toggle("dark", prefersDark);
    document.body.classList.toggle("light", !prefersDark);
  }

  componentDidMount() {
    this.setTheme();
  }

  render() {
    globalThis.window
      ?.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", this.setTheme);
    return <this.props.Component {...this.props.pageProps} />;
  }
}
