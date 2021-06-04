import React from "react";

import Head from "next/head";

import { getTranslation } from "../util/translation";
import { HeaderBarComponent } from "../components/headerBar";

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
          <title id="title">Strings - Tinkers&apos; Construct</title>
        </Head>
        <HeaderBarComponent>
          {" "}
          | <span className="bold">Translations</span>
        </HeaderBarComponent>
        <label htmlFor="translationInput">
          Enter untranslated Tinkers&apos; Construct string here
        </label>
        <input
          id="translationInput"
          ref={this.translationInput}
          type="text"
          onInput={() => {
            const output = this.translationOutput.current;
            if (!output) return;
            output.textContent = getTranslation(
              this.translationInput.current?.value ?? ""
            );
          }}
        />
        <br />
        <div id="translationOutput" ref={this.translationOutput} />
      </>
    );
  }
}
