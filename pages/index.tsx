import React from "react";

import Head from "next/head";
import Link from "next/link";

import Recipes from "../data/recipes.json";
import { NormalModifierRecipe, RecipesJSON } from "../util/types";

import { ModifierLinkComponent } from "../components/modifierLink";
import { ToggleDarkModeButtonComponent } from "../components/toggleDarkModeButton";
import { IndexSectionComponent } from "../components/indexSection";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    const allRecipes = Recipes as RecipesJSON;

    return (
      <>
        <Head>
          <title key="title">Index - Tinkers&apos; Construct Modifiers</title>
        </Head>
        <ToggleDarkModeButtonComponent />
        <div id="indexDiv">
          <IndexSectionComponent id="utilitiesDiv" title="Utilities">
            <Link href="/translation">
              <a className="indexLink">Translations</a>
            </Link>
          </IndexSectionComponent>
          <IndexSectionComponent id="abilitiesDiv" title="Abilities">
            <ul>
              {Object.values(allRecipes.abilityRecipes)
                .map((recipe) => recipe.result.name)
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
              {Object.values(allRecipes.upgradeRecipes)
                .map((recipe) => recipe.result.name)
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
              {Object.values(allRecipes.slotlessRecipes)
                .filter(
                  (recipe) =>
                    recipe.type !== `tconstruct:overslime_modifier` &&
                    recipe.type !== `tconstruct:remove_modifier`
                )
                .map((recipe) => (recipe as NormalModifierRecipe).result.name)
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
              <Link href="/modifier/overslime/">
                <a className="indexLink">
                  <h4>Overslime refilling recipes</h4>
                </a>
              </Link>
              <div className="horizontal-rule" />
              <Link href="/modifier/remove">
                <a className="indexLink">
                  <h4>Remove modifier</h4>
                </a>
              </Link>
            </ul>
          </IndexSectionComponent>
        </div>
      </>
    );
  }
}
