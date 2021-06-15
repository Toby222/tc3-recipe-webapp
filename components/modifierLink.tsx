import React from "react";

import Link from "next/link";
import { getTranslation } from "../util/translation";

type Props = { modifierId: string };

export class ModifierLinkComponent extends React.Component<Props> {
  render() {
    const modifierName = getTranslation(
      "modifier." + this.props.modifierId.replace(":", ".")
    );
    return (
      <Link href={"/modifier/" + this.props.modifierId}>
        <a className="indexLink">{modifierName}</a>
      </Link>
    );
  }
}
