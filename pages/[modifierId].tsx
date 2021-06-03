import React from "react";

import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Link from "next/link";

import { ModifierComponent } from "../components/modifier";
import Recipes from "../data/recipes.json";
import { RecipesJSON } from "../util/types";
import { getTranslation } from "../util/translation";

type Props = WithRouterProps;

class ModifierPage extends React.Component<Props> {
  private translationInput;

  constructor(props: Props) {
    super(props);

    this.translationInput = React.createRef<HTMLInputElement>();
  }

  render(): JSX.Element {
    const modifierId = this.props.router.query["modifierId"];
    const allRecipes = Recipes as RecipesJSON;

    const validRecipes = Object.entries(allRecipes).flatMap(([, recipes]) =>
      Object.entries(recipes).filter(
        ([, recipe]) => recipe.result.name === modifierId
      )
    );

    return typeof modifierId !== "string" ? (
      <>Something went wrong... Are you sure this is a modifier?</>
    ) : (
      <>
        <ul id="headerBar">
          <Link href="/">Back</Link> |{" "}
          <span style={{ fontWeight: "bold" }}>({modifierId})</span> |{" "}
          <input
            id="translationInput"
            ref={this.translationInput}
            type="text"
            onInput={() => {
              const label = this.translationInput.current?.labels?.item(0);
              if (!label) return;
              label.textContent = getTranslation(
                this.translationInput.current?.value ?? ""
              );
            }}
          />{" "}
          <label htmlFor="translationInput">
            Enter untranslated Tinkers&apos; Construct string here
          </label>
        </ul>
        <>
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
        </>
        <br />
        {validRecipes.length > 0 ? (
          <h1>Recipes</h1>
        ) : (
          <>
            <h1>No recipes found...</h1>
            <h6>... Are you sure this is a modifier?</h6>
          </>
        )}
        {validRecipes.map(([originPath, recipe], idx) => (
          <>
            <div className="horizontal-rule" />
            <ModifierComponent key={idx} origin={originPath} recipe={recipe} />
          </>
        ))}
        <div className="horizontal-rule" />
      </>
    );
  }
}

export default withRouter(ModifierPage);
