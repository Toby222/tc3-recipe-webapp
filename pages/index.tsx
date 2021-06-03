import React from "react";
import { ModifierLinkComponent } from "../components/modifierLink";

import Recipes from "../data/recipes.json";
import { RecipesJSON } from "../util/types";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    const recipes = Recipes as RecipesJSON;
    let i = 0;

    return (
      <div id="indexDiv">
        <div id="abilitiesDiv" className="modifierDiv">
          <h2 key={i++}>Abilities</h2>
          <ul key={i++}>
            {Object.entries(recipes.abilityRecipes)
              .map(([, recipe]) => recipe.result.name)
              .filter(
                (modifierId, idx, array) => array.indexOf(modifierId) === idx
              )
              .map((modifierId) => (
                <li key={i++}>
                  <ModifierLinkComponent key={i++} modifierId={modifierId} />
                </li>
              ))}
          </ul>
        </div>
        <div id="upgradesDiv" className="modifierDiv">
          <h2 key={i++}>Upgrades</h2>
          <ul key={i++}>
            {Object.entries(recipes.upgradeRecipes)
              .map(([, recipe]) => recipe.result.name)
              .filter(
                (modifierId, idx, array) => array.indexOf(modifierId) === idx
              )
              .map((modifierId) => (
                <li key={i++}>
                  <ModifierLinkComponent key={i++} modifierId={modifierId} />
                </li>
              ))}
          </ul>
        </div>
        <div id="slotlessDiv" className="modifierDiv">
          <h2 key={i++}>Slotless Upgrades</h2>
          <ul key={i++}>
            {Object.entries(recipes.slotlessRecipes)
              .map(([, recipe]) => recipe.result.name)
              .filter(
                (modifierId, idx, array) => array.indexOf(modifierId) === idx
              )
              .map((modifierId) => (
                <li key={i++}>
                  <ModifierLinkComponent key={i++} modifierId={modifierId} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
