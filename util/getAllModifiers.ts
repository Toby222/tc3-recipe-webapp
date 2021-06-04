import { RecipesJSON } from "./types";
import Recipes from "../data/recipes.json";

export function getAllModifiers() {
  return Object.values(Recipes as RecipesJSON)
    .flatMap((recipeCollection) => Object.values(recipeCollection))
    .map((recipe) => recipe.result.name)
    .filter((modifier, idx, array) => array.indexOf(modifier) === idx);
}
