import React from "react";
import { ModifierRecipe } from "../util/types";

type Props = { recipe: ModifierRecipe; origin: string };

export class RecipeComponent extends React.Component<Props> {
  render() {
    return <pre>{JSON.stringify(this.props.recipe, null, 2)}</pre>;
  }
}
