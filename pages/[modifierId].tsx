import React from "react";

import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Link from "next/link";

import { RecipeComponent } from "../components/recipe";
import Recipes from "../data/recipes.json";
import { RecipesJSON } from "../util/types";

type Props = WithRouterProps;

class RecipePage extends React.Component<Props> {
  render(): JSX.Element {
    const modifierId = this.props.router.query["modifierId"];
    const allRecipes = Recipes as RecipesJSON;

    const validRecipes = Object.entries(allRecipes).flatMap(([, recipes]) =>
      Object.entries(recipes).filter(
        ([, recipe]) => recipe.result.name === modifierId
      )
    );

    return (
      <>
        <ul>
          <Link href="/">Back</Link> |{" "}
          <em style={{ fontWeight: "bold" }}>{modifierId}</em>
        </ul>
        {validRecipes.length > 0 ? (
          <h1>Recipes</h1>
        ) : (
          <>
            <h1>No recipes found...</h1>
            <h6>... this shouldn&apos;t happen</h6>
          </>
        )}
        {validRecipes.map(([originPath, recipe], idx) => (
          <RecipeComponent key={idx} origin={originPath} recipe={recipe} />
        ))}
      </>
    );
  }
}

export default withRouter(RecipePage);
