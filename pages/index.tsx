import React from "react";
import { RecipeLinkComponent } from "../components/recipeLink";

import Recipes from "../data/recipes.json";
import { RecipesJSON } from "../util/types";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    const recipes = Recipes as RecipesJSON;
    const elements: JSX.Element[] = [];
    let i = 0;
    elements.push(<h1 key={i++}>Abilities</h1>);
    for (const modifierId of Object.entries(recipes.abilityRecipes)
      .map(([, recipe]) => recipe.result.name)
      .filter((modifierId, idx, array) => array.indexOf(modifierId) === idx)) {
      elements.push(
        <li key={i++}>
          <RecipeLinkComponent modifierId={modifierId} />
        </li>
      );
    }
    elements.push(<h1 key={i++}>Upgrades</h1>);
    for (const modifierId of Object.entries(recipes.upgradeRecipes)
      .map(([, recipe]) => recipe.result.name)
      .filter((modifierId, idx, array) => array.indexOf(modifierId) === idx)) {
      elements.push(
        <li key={i++}>
          <RecipeLinkComponent modifierId={modifierId} />
        </li>
      );
    }
    elements.push(<h1 key={i++}>Slotless Upgrades</h1>);
    for (const modifierId of Object.entries(recipes.slotlessRecipes)
      .map(([, recipe]) => recipe.result.name)
      .filter((modifierId, idx, array) => array.indexOf(modifierId) === idx)) {
      elements.push(
        <li key={i++}>
          <RecipeLinkComponent modifierId={modifierId} />
        </li>
      );
    }
    return <ul>{elements}</ul>;
  }
}
