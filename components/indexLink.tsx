import React from "react";

import Link from "next/link";

type Props = { link: string };

export class IndexLinkComponent extends React.Component<Props> {
  render() {
    return (
      <Link href={this.props.link}>
        <a className="indexLink">{this.props.children}</a>
      </Link>
    );
  }
}
