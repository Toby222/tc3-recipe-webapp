import React from "react";

import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Head from "next/head";

import { JSONComponent } from "../../components/json";

import Recipes from "../../data/recipes.json";
import {
  isOverslimeModifierRecipe,
  isRemoveModifierRecipe,
} from "../../util/types";
import type { RecipesJSON } from "../../util/types";
import { getTranslation } from "../../util/translation";
import { HeaderBarComponent } from "../../components/headerBar";

type Props = WithRouterProps;

class ModifierPage extends React.Component<Props> {
  render(): JSX.Element {
    const modifierId = this.props.router.query["modifierId"];
    const allRecipes = Recipes as RecipesJSON;

    const validRecipes = Object.values(allRecipes).flatMap((recipeCollection) =>
      Object.values(recipeCollection).filter(
        (recipe) =>
          !(
            isOverslimeModifierRecipe(recipe) || isRemoveModifierRecipe(recipe)
          ) && recipe.result.name === modifierId
      )
    );

    return typeof modifierId !== "string" ? (
      <>
        <Head>
          <title key="title">Error - Tinkers&apos; Construct Modifiers</title>
        </Head>
        Something went wrong... Are you sure this is a modifier?
      </>
    ) : (
      <>
        <Head>
          <title key="title">
            {getTranslation("modifier." + modifierId.replace(":", "."))} -
            Tinkers&apos; Construct Modifiers
          </title>
        </Head>
        <HeaderBarComponent>
          {" "}
          | <span className="bold">Recipes</span> | <span>({modifierId})</span>
        </HeaderBarComponent>
        <h1>{getTranslation("modifier." + modifierId.replace(":", "."))}</h1>
        <div style={{ fontSize: 20 }}>
          <span style={{ textDecoration: "underline" }}>
            {getTranslation(
              "modifier." + modifierId.replace(":", ".") + ".flavor"
            )}
          </span>
          <br />
          <br />
          <span>
            {getTranslation(
              "modifier." + modifierId.replace(":", ".") + ".description"
            )}
          </span>
        </div>
        <br />
        {validRecipes.length > 0 ? (
          <h1>Recipes</h1>
        ) : (
          <>
            <Head>
              <title key="title">
                Error - Tinkers&apos; Construct Modifiers
              </title>
            </Head>
            <h1>No recipes found...</h1>
            <h6>... Are you sure this is a modifier?</h6>
          </>
        )}
        {validRecipes.map((recipe, idx) => (
          <React.Fragment key={modifierId + "-recipe-" + idx}>
            <div className="horizontal-rule" />
            <JSONComponent json={recipe} />
          </React.Fragment>
        ))}
        <div className="horizontal-rule" />
      </>
    );
  }
}

export default withRouter(ModifierPage);
