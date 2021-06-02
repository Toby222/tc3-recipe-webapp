import React from "react";

import Link from "next/link";
import { getTranslation } from "../util/translation";

type Props = { modifierId: string };

export class RecipeLinkComponent extends React.Component<Props> {
  render() {
    const modifierName = getTranslation(
      "modifier." + this.props.modifierId.replace(":", ".")
    );
    return (
      <>
        Recipe for:{" "}
        <Link href={"/" + this.props.modifierId}>
          <a style={{ fontWeight: "bold" }}>{modifierName}</a>
        </Link>
      </>
    );
  }
}
