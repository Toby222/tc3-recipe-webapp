import React from "react";

import Head from "next/head";

import Recipes from "../data/recipes.json";
import { RecipesJSON } from "../util/types";

import { ModifierLinkComponent } from "../components/modifierLink";
import { ToggleDarkModeButtonComponent } from "../components/toggleDarkModeButton";
import { IndexSectionComponent } from "../components/indexSection";
import { IndexLinkComponent } from "../components/indexLink";

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
          <IndexSectionComponent id="utilitiesDiv" title="Utilities">
            <IndexLinkComponent link="/translation">
              Translations
            </IndexLinkComponent>
          </IndexSectionComponent>
          <IndexSectionComponent id="abilitiesDiv" title="Abilities">
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
          </IndexSectionComponent>
          <IndexSectionComponent id="upgradesDiv" title="Upgrades">
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
          </IndexSectionComponent>
          <IndexSectionComponent id="slotlessDiv" title="Slotless Upgrades">
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
          </IndexSectionComponent>
        </div>
      </>
    );
  }
}
