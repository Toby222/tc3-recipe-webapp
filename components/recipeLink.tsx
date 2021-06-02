import React from "react";

import Link from "next/link";

type Props = { modifierId: string };

export class RecipeLinkComponent extends React.Component<Props> {
  render() {
    return (
      <>
        Recipe for:{" "}
        <Link href={"/" + this.props.modifierId}>
          <a style={{ fontWeight: "bold" }}>{this.props.modifierId}</a>
        </Link>
      </>
    );
  }
}
