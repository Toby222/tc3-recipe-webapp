import React from "react";

import Link from "next/link";
import { ToggleDarkModeButtonComponent } from "./toggleDarkModeButton";

type Props = Record<string, unknown>;

export class HeaderBarComponent extends React.Component<Props> {
  render() {
    return (
      <ul id="headerBar">
        <Link href="/">Back</Link>
        {this.props.children}
        <ToggleDarkModeButtonComponent />
      </ul>
    );
  }
}
