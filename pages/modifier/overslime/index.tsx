import React from "react";

import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Head from "next/head";

import { JSONComponent } from "../../../components/json";

import Recipes from "../../../data/recipes.json";
import {
  getItemIdentifierId,
  isOverslimeModifierRecipe,
  OverslimeModifierRecipe,
} from "../../../util/types";
import { getTranslation } from "../../../util/translation";
import { HeaderBarComponent } from "../../../components/headerBar";

type Props = WithRouterProps;

class ModifierPage extends React.Component<Props> {
  render(): JSX.Element {
    const overSlimeRecipes = Object.entries(Recipes).flatMap(([, recipes]) =>
      Object.entries(recipes)
        .filter(([, recipe]) => isOverslimeModifierRecipe(recipe))
        .map(([, recipe]) => recipe as OverslimeModifierRecipe)
    );

    return (
      <>
        <Head>
          <title key="title">
            {getTranslation("modifier.tconstruct.overslime")} - Tinkers&apos;
            Construct Modifiers
          </title>
        </Head>
        <HeaderBarComponent>
          {" "}
          | <span className="bold">Recipes</span> |{" "}
          <span className="bold">Overslime</span>
        </HeaderBarComponent>
        <h1>Recipes</h1>
        {overSlimeRecipes.map((recipe, idx) => (
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
