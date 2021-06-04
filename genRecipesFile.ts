/* eslint-disable no-console */
import path from "path";
import fs from "fs/promises";
import {
  AnyModifierRecipe,
  isAnyModifierRecipe,
  isNormalModifierRecipe,
  NormalModifierRecipe,
} from "./util/types";

export async function generateRecipesFile() {
  const modifierBasePath =
    "./TinkersConstruct/src/generated/resources/data/tconstruct/recipes/tools/modifiers/";
  const abilityFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "ability/"
  );
  const abilityRecipes: Record<string, NormalModifierRecipe> = {};
  for await (const file of abilityFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isNormalModifierRecipe(parsedContents)) {
      abilityRecipes[file] = parsedContents;
    } else {
      // eslint-disable-next-line no-console
      console.debug("{ability} not a recipe", file);
    }
  }

  const upgradeFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "upgrade/"
  );
  const upgradeRecipes: Record<string, NormalModifierRecipe> = {};
  for await (const file of upgradeFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isNormalModifierRecipe(parsedContents))
      upgradeRecipes[file] = parsedContents;
    // eslint-disable-next-line no-console
    else console.debug("{upgrade} not a recipe", file);
  }

  const slotlessFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "slotless/"
  );
  const slotlessRecipes: Record<string, AnyModifierRecipe> = {};
  for await (const file of slotlessFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isAnyModifierRecipe(parsedContents))
      slotlessRecipes[file] = parsedContents;
    // eslint-disable-next-line no-console
    else console.debug("{slotless} not a recipe", file);
  }

  const recipes = { abilityRecipes, slotlessRecipes, upgradeRecipes };
  await fs.writeFile(
    "./data/recipes.json",
    JSON.stringify(recipes, null, process.argv[2] === "dev" ? 2 : 0)
  );
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
generateRecipesFile().catch((err) => console.error(err));
