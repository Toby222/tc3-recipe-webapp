import React from "react";

import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Link from "next/link";

type Props = WithRouterProps;

class RecipePage extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <>
        <Link href="/">Back</Link>
        <br />
        {this.props.router.query["modifierId"]}
        <br />
        {/*<RecipeComponent />*/}
      </>
    );
  }
}

export default withRouter(RecipePage);
