import React from "react";

import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Head from "next/head";

import { JSONComponent } from "../../../components/json";

import Recipes from "../../../data/recipes.json";
import {
  getItemIdentifierId,
  isRemoveModifierRecipe,
  RemoveModifierRecipe,
} from "../../../util/types";
import { getTranslation } from "../../../util/translation";
import { HeaderBarComponent } from "../../../components/headerBar";

type Props = WithRouterProps;

class ModifierPage extends React.Component<Props> {
  render(): JSX.Element {
    const removeModifierRecipes = Object.entries(Recipes).flatMap(
      ([, recipes]) =>
        Object.entries(recipes)
          .filter(([, recipe]) => isRemoveModifierRecipe(recipe))
          .map(([, recipe]) => recipe as RemoveModifierRecipe)
    );

    return (
      <>
        <Head>
          <title key="title">
            Recipes that remove Modifiers - Tinkers&apos; Construct Modifiers
          </title>
        </Head>
        <HeaderBarComponent>
          {" "}
          | <span className="bold">Recipes</span> |{" "}
          <span className="bold">Remove</span>
        </HeaderBarComponent>
        <h1>Recipes</h1>
        {removeModifierRecipes.map((recipe, idx) => (
          <React.Fragment
            key={getItemIdentifierId(recipe.ingredient) + "-recipe-" + idx}
          >
            <span className="bold">
              {getTranslation(
                "item." +
                  getItemIdentifierId(recipe.ingredient).replace(":", ".")
              )}
              <div className="horizontal-rule" />
            </span>
            <JSONComponent json={recipe} />
          </React.Fragment>
        ))}
        <div className="horizontal-rule" />
      </>
    );
  }
}

export default withRouter(ModifierPage);
