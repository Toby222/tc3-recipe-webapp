import React from "react";
import { ModifierLinkComponent } from "../components/modifierLink";

import Recipes from "../data/recipes.json";
import { RecipesJSON } from "../util/types";

import Head from "next/head";
import { ToggleDarkModeButtonComponent } from "../components/toggleDarkModeButton";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    const recipes = Recipes as RecipesJSON;

    return (
      <>
        <Head>
          <title key="title">Index - Tinkers&apos; Construct Modifiers</title>
        </Head>
        <ToggleDarkModeButtonComponent />
        <div id="indexDiv">
          <div id="abilitiesDiv" className="modifierDiv">
            <h2>Abilities</h2>
            <ul>
              {Object.entries(recipes.abilityRecipes)
                .map(([, recipe]) => recipe.result.name)
                .filter(
                  (modifierId, idx, array) => array.indexOf(modifierId) === idx
                )
                .map((modifierId) => (
                  <li key={"recipe-ability-" + modifierId}>
                    <ModifierLinkComponent modifierId={modifierId} />
                  </li>
                ))}
            </ul>
          </div>
          <div id="upgradesDiv" className="modifierDiv">
            <h2>Upgrades</h2>
            <ul>
              {Object.entries(recipes.upgradeRecipes)
                .map(([, recipe]) => recipe.result.name)
                .filter(
                  (modifierId, idx, array) => array.indexOf(modifierId) === idx
                )
                .map((modifierId) => (
                  <li key={"recipe-upgrade-" + modifierId}>
                    <ModifierLinkComponent modifierId={modifierId} />
                  </li>
                ))}
            </ul>
          </div>
          <div id="slotlessDiv" className="modifierDiv">
            <h2>Slotless Upgrades</h2>
            <ul>
              {Object.entries(recipes.slotlessRecipes)
                .map(([, recipe]) => recipe.result.name)
                .filter(
                  (modifierId, idx, array) => array.indexOf(modifierId) === idx
                )
                .map((modifierId) => (
                  <li key={"recipe-slotless-" + modifierId}>
                    <ModifierLinkComponent modifierId={modifierId} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
