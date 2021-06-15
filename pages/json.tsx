import React from "react";

import Head from "next/head";

import { HeaderBarComponent } from "../components/headerBar";
import { syntaxHighlight } from "../util/jsonDisplay";

type Props = Record<string, never>;

export default class TranslationPage extends React.Component<Props> {
  private translationInput;
  private translationOutput;

  constructor(props: Props) {
    super(props);

    this.translationInput = React.createRef<HTMLInputElement>();
    this.translationOutput = React.createRef<HTMLDivElement>();
  }

  render() {
    return (
      <>
        <Head>
          <title id="title">JSON Highlight Test</title>
        </Head>
        <HeaderBarComponent>
          {" "}
          | <span className="bold">Testing</span>
        </HeaderBarComponent>
        <label htmlFor="translationInput">Enter JSON here</label>
        <input
          id="translationInput"
          ref={this.translationInput}
          type="text"
          onInput={() => {
            this.forceUpdate();
          }}
        />
        <br />
        <pre className="json">
          {syntaxHighlight(this.translationInput.current?.value ?? "")}
        </pre>
      </>
    );
  }
}
