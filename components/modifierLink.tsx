import React from "react";

import { IndexLinkComponent } from "./indexLink";
import { getTranslation } from "../util/translation";

type Props = { modifierId: string };

export class ModifierLinkComponent extends React.Component<Props> {
  render() {
    const modifierName = getTranslation(
      "modifier." + this.props.modifierId.replace(":", ".")
    );
    return (
      <IndexLinkComponent link={"/modifier/" + this.props.modifierId}>
        {modifierName}
      </IndexLinkComponent>
    );
  }
}
