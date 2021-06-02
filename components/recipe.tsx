import React from "react";
import { ModifierRecipe } from "../util/types";

type Props = { recipe: ModifierRecipe };

export class RecipeComponent extends React.Component<Props> {
  render() {
    return (
      <>
        Recipe for:{" "}
        <span style={{ fontWeight: "bold" }}>
          {this.props.recipe.result.name}
        </span>
      </>
    );
  }
}
