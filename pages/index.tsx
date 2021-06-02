import React from "react";
import { GetStaticProps } from "next";

import path from "path";
import fs from "fs/promises";

import { isModifierRecipe, ModifierRecipe } from "../util/types";
import { RecipeLinkComponent } from "../components/recipeLink";

type Props = Record<
  "abilityRecipes" | "slotlessRecipes" | "upgradeRecipes",
  Record<string, ModifierRecipe>
>;

type State = Record<string, never>;
export default class IndexPage extends React.Component<Props, State> {
  render(): JSX.Element {
    const elements: JSX.Element[] = [];
    let i = 0;
    elements.push(<h1 key={i++}>Abilities</h1>);
    for (const modifierId of Object.entries(this.props.abilityRecipes)
      .map(([, recipe]) => recipe.result.name)
      .filter((modifierId, idx, array) => array.indexOf(modifierId) === idx)) {
      elements.push(
        <li key={i++}>
          <RecipeLinkComponent modifierId={modifierId} />
        </li>
      );
    }
    elements.push(<h1 key={i++}>Upgrades</h1>);
    for (const modifierId of Object.entries(this.props.abilityRecipes)
      .map(([, recipe]) => recipe.result.name)
      .filter((modifierId, idx, array) => array.indexOf(modifierId) === idx)) {
      elements.push(
        <li key={i++}>
          <RecipeLinkComponent modifierId={modifierId} />
        </li>
      );
    }
    elements.push(<h1 key={i++}>Slotless Upgrades</h1>);
    for (const modifierId of Object.entries(this.props.abilityRecipes)
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

async function* getFolderContentsRecursive(
  dir: string
): AsyncGenerator<string, void, unknown> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFolderContentsRecursive(res);
    } else {
      yield res;
    }
  }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const modifierBasePath =
    "./TinkersConstruct/src/generated/resources/data/tconstruct/recipes/tools/modifiers/";
  const abilityFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "ability/"
  );
  const abilityRecipes: Record<string, ModifierRecipe> = {};
  for await (const file of abilityFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isModifierRecipe(parsedContents)) {
      abilityRecipes[file] = parsedContents;
    } else if (window === undefined) {
      // eslint-disable-next-line no-console
      console.debug("{ability} not a recipe", file);
    }
  }

  const upgradeFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "upgrade/"
  );
  const upgradeRecipes: Record<string, ModifierRecipe> = {};
  for await (const file of upgradeFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isModifierRecipe(parsedContents)) upgradeRecipes[file] = parsedContents;
    // eslint-disable-next-line no-console
    else console.debug("{upgrade} not a recipe", file);
  }

  const slotlessFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "slotless/"
  );
  const slotlessRecipes: Record<string, ModifierRecipe> = {};
  for await (const file of slotlessFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isModifierRecipe(parsedContents))
      slotlessRecipes[file] = parsedContents;
    // eslint-disable-next-line no-console
    else console.debug("{slotless} not a recipe", file);
  }

  return { props: { abilityRecipes, slotlessRecipes, upgradeRecipes } };
};
