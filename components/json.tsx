import React from "react";
import { outputPretty } from "../util/jsonDisplay";

type Props = { json: string | Record<string, unknown> };

export class JSONComponent extends React.Component<Props> {
  render() {
    return <pre className="json">{outputPretty(this.props.json)}</pre>;
  }
}
