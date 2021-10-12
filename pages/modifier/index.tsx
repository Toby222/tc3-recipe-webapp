import React from "react";

import Head from "next/head";

import { getAllModifiers } from "../../util/getAllModifiers";

import { ModifierLinkComponent } from "../../components/modifierLink";
import { HeaderBarComponent } from "../../components/headerBar";
import { ToggleDarkModeButtonComponent } from "../../components/toggleDarkModeButton";

type Props = Record<string, unknown>;

export default class ModifierIndexPage extends React.Component<Props> {
  render() {
    return (
      <>
        <Head>
          <title key="title">Index - Tinkers&apos; Construct Modifiers</title>
        </Head>
        <ToggleDarkModeButtonComponent />
        <HeaderBarComponent>
          {" "}
          | <span className="bold">All Modifiers</span>
        </HeaderBarComponent>
        <ul>
          {getAllModifiers(false)
            .sort()
            .map((modifierId) => (
              <React.Fragment key={modifierId}>
                <ModifierLinkComponent modifierId={modifierId} />
                <br />
              </React.Fragment>
            ))}
        </ul>
      </>
    );
  }
}
