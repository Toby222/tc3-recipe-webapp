/* eslint-disable no-console */
import path from "path";
import fs from "fs/promises";
import {
  AnyModifierRecipe,
  isAnyModifierRecipe,
  isNormalModifierRecipe,
  NormalModifierRecipe,
} from "./util/types";

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
export async function generateRecipesFile(dev = false) {
  console.log("generating recipes file");
  const modifierBasePath =
    "./TinkersConstruct/src/generated/resources/data/tconstruct/recipes/tools/modifiers/";
  const abilityFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "ability/"
  );
  const abilityRecipes: NormalModifierRecipe[] = [];
  for await (const file of abilityFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isNormalModifierRecipe(parsedContents)) {
      abilityRecipes.push(parsedContents);
    } else {
      // eslint-disable-next-line no-console
      console.debug("{ability} not a recipe", file);
    }
  }

  const upgradeFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "upgrade/"
  );
  const upgradeRecipes: NormalModifierRecipe[] = [];
  for await (const file of upgradeFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isNormalModifierRecipe(parsedContents))
      upgradeRecipes.push(parsedContents);
    // eslint-disable-next-line no-console
    else console.debug("{upgrade} not a recipe", file);
  }

  const slotlessFilesGenerator = getFolderContentsRecursive(
    modifierBasePath + "slotless/"
  );
  const slotlessRecipes: AnyModifierRecipe[] = [];
  for await (const file of slotlessFilesGenerator) {
    const fileContents = await fs.readFile(file);
    const parsedContents = JSON.parse(fileContents.toString("utf-8"));
    if (isAnyModifierRecipe(parsedContents))
      slotlessRecipes.push(parsedContents);
    // eslint-disable-next-line no-console
    else console.debug("{slotless} not a recipe", file);
  }

  const recipes = { abilityRecipes, slotlessRecipes, upgradeRecipes };
  await fs.writeFile(
    "./data/recipes.json",
    JSON.stringify(recipes, null, dev ? 2 : 0)
  );
  console.log(
    "generated recipes file; " +
      [abilityRecipes, slotlessRecipes, upgradeRecipes].flatMap((recipes) =>
        Object.values(recipes)
      ).length
  );
}

export async function generateLangsFile(dev = false) {
  console.log("generating lang file");
  const files = getFolderContentsRecursive(
    "./TinkersConstruct/src/main/resources/assets/tconstruct/lang"
  );

  const lang: Record<string, Record<string, string>> = {};
  for await (const langFilepath of files) {
    const languageId = path.basename(langFilepath, path.extname(langFilepath));
    const language = JSON.parse(
      (await fs.readFile(langFilepath)).toString("utf-8")
    );

    for (const key of Object.keys(language)) {
      if (key.startsWith("_")) {
        delete language[key];
      }
    }

    lang[languageId] = language;
  }
  await fs.writeFile(
    "./data/lang.json",
    JSON.stringify(lang, null, dev ? 2 : 0)
  );
  console.log("generated lang file; " + Object.keys(lang).length);
}

export async function generateMetaFile(dev = false) {
  console.log("generating meta files");
  const gradleProperties = (
    await fs.readFile("./TinkersConstruct/gradle.properties")
  ).toString("utf-8");
  const modVersion =
    gradleProperties.match(/^mod_version=((?:\d+\.?)+)$/m)?.[1] ??
    "invalid_version";
  const meta = { modVersion };

  const oEmbed = JSON.parse(
    (await fs.readFile("./public/oEmbed.json")).toString("utf-8")
  );

  oEmbed.provider_name = "TC_" + modVersion;

  await Promise.allSettled([
    fs.writeFile(
      "./public/oEmbed.json",
      JSON.stringify(oEmbed, null, dev ? 2 : 0)
    ),
    fs.writeFile("./data/meta.json", JSON.stringify(meta, null, dev ? 2 : 0)),
  ]);
  console.log(
    "generated meta files; " +
      Object.keys(oEmbed).length +
      " ; " +
      Object.keys(meta).length
  );
}

async function main() {
  const dev = process.argv[2] === "dev";
  await Promise.allSettled([
    generateRecipesFile(dev),
    generateLangsFile(dev),
    generateMetaFile(dev),
  ]);
}
main();
