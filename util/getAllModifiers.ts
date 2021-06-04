import {
  getItemIdentifierId,
  isOverslimeModifierRecipe,
  RecipesJSON,
  TConstructId,
} from "./types";
import Recipes from "../data/recipes.json";

export function getAllModifiers(excludeOverslime = true) {
  return Object.values(Recipes as RecipesJSON)
    .flatMap((recipeCollection) => Object.values(recipeCollection))
    .filter(
      (recipe) =>
        !excludeOverslime || recipe.type !== `tconstruct:overslime_modifier`
    )
    .map((recipe) =>
      isOverslimeModifierRecipe(recipe)
        ? getItemIdentifierId(recipe.ingredient)
        : (recipe.result.name as TConstructId)
    )
    .filter((modifier, idx, array) => array.indexOf(modifier) === idx);
}
