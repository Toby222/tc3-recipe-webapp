import React from "react";

type Props = { title: string; id?: string };

export class IndexSectionComponent extends React.Component<Props> {
  render() {
    return (
      <div id={this.props.id} className="indexSection">
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}
