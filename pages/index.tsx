import React from "react";

import Head from "next/head";

import Recipes from "../data/recipes.json";
import { NormalModifierRecipe, RecipesJSON } from "../util/types";

import { ModifierLinkComponent } from "../components/modifierLink";
import { ToggleDarkModeButtonComponent } from "../components/toggleDarkModeButton";
import { IndexSectionComponent } from "../components/indexSection";
import { IndexLinkComponent } from "../components/indexLink";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    const allRecipes = Recipes as RecipesJSON;

    return (
      <>
        <Head>
          <title key="title">Index - Tinkers&apos; Construct Modifiers</title>
          <meta charSet="utf-8" />
          <meta
            property="og:title"
            itemProp="name"
            content="Tinkers' Construct 3 Recipes"
          />
          {/* TODO: Fill in more meta tags */}
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
              {Object.entries(allRecipes.abilityRecipes)
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
              {Object.entries(allRecipes.upgradeRecipes)
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
              {Object.entries(allRecipes.slotlessRecipes)
                .filter(
                  ([, recipe]) =>
                    recipe.type !== `tconstruct:overslime_modifier`
                )
                .map(
                  ([, recipe]) => (recipe as NormalModifierRecipe).result.name
                )
                .filter(
                  (modifierId, idx, array) => array.indexOf(modifierId) === idx
                )
                .map((modifierId) => (
                  <li key={"recipe-slotless-" + modifierId}>
                    <ModifierLinkComponent modifierId={modifierId} />
                  </li>
                ))}
              <br />
              <div className="horizontal-rule" />
              <IndexLinkComponent link={"/modifier/overslime/"}>
                <h4>Overslime refilling recipes</h4>
              </IndexLinkComponent>
            </ul>
          </IndexSectionComponent>
        </div>
      </>
    );
  }
}
