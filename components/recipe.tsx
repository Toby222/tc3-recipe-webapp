import React from "react";
import { ModifierRecipe } from "../util/types";

type Props = { recipe: ModifierRecipe };

export class RecipeComponent extends React.Component<Props> {
  render() {
    return <>{JSON.stringify(this.props.recipe)}</>;
  }
}
