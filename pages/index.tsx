import React from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import https from "https";

import { Octokit } from "@octokit/core";

type MinecraftId = `minecraft:${string}`;
type TConstructId = `tconstruct:${string}`;
type ForgeId = `forge:${string}`;

type Id = MinecraftId | ForgeId | MinecraftId;

type ItemIdentifier = { item: Id } | { tag: Id };
type MultiItemIdentifier = {
  ingredient: ItemIdentifier[];
};

type ItemSpecifier =
  | ItemIdentifier
  | {
      type: `mantle:without`;
      base: ItemSpecifier;
      without: ItemIdentifier[];
    };

type ToolRequirementsBasic = {
  name: string;
  level: number;
  error: string;
};
type ToolRequirements =
  | ToolRequirementsBasic
  | {
      options: {
        name: string;
        level: number;
      }[];
      matches_needed: number;
      error: string;
    };

type ModifierRecipe =
  | {
      type: `tconstruct:modifier`;
      inputs: (ItemSpecifier | MultiItemIdentifier)[];
      tools: ItemSpecifier;
      requirements?: ToolRequirements;
      result: {
        name: TConstructId;
        level: number;
      };
      max_level?: number;
      ability_slots?: number;
      upgrade_slots?: number;
    }
  | {
      type: `tconstruct:incremental_modifier`;
      input: ItemIdentifier;
      amount_per_item: number;
      needed_per_level: number;
      leftover?: Id;
      tools: ItemIdentifier;
      result: {
        name: TConstructId;
        level: number;
      };
      max_level: number;
      upgrade_slots: number;
    };

function isMultiItemIdentifier(val: any): val is MultiItemIdentifier {
  const result =
    typeof val === "object" &&
    val !== null &&
    Array.isArray(val.ingredient) &&
    val.ingredient.every((element: any) => isItemIdentifier(element));
  return result;
}

function isItemSpecifier(val: any): val is ItemSpecifier {
  const result =
    isItemIdentifier(val) ||
    (typeof val === "object" &&
      val !== null &&
      val.type === `mantle:without` &&
      Array.isArray(val.without) &&
      val.without.every((element: any) => isItemIdentifier(element)) &&
      isItemSpecifier(val.base));
  return result;
}

function isToolRequirementsBasic(val: any): val is ToolRequirementsBasic {
  return (
    typeof val === "object" &&
    val !== null &&
    typeof val.name === "string" &&
    typeof val.level === "number" &&
    typeof val.error === "string"
  );
}

function isToolRequirements(val: any): val is ToolRequirements {
  return (
    isToolRequirementsBasic(val) ||
    (typeof val === "object" &&
      val !== null &&
      typeof val.matches_needed === "number" &&
      typeof val.error === "string" &&
      Array.isArray(val.options) &&
      val.options.every(
        (element: any) =>
          typeof element === "object" &&
          typeof element.name === "string" &&
          typeof element.level == "number"
      ))
  );
}

function isItemIdentifier(val: any): val is ItemIdentifier {
  const result =
    typeof val === "object" && val !== null && isId(val.item) !== isId(val.tag);
  return result;
}

function isMinecraftId(val: any): val is MinecraftId {
  return typeof val === "string" && /minecraft:.+/.test(val);
}
function isTConstructId(val: any): val is TConstructId {
  return typeof val === "string" && /tconstruct:.+/.test(val);
}
function isForgeId(val: any): val is ForgeId {
  return typeof val === "string" && /forge:.+/.test(val);
}
function isId(val: any): val is Id {
  return isMinecraftId(val) || isTConstructId(val) || isForgeId(val);
}

function isModifierRecipe(val: any): val is ModifierRecipe {
  if (typeof val !== "object" || val === null) return false;
  if (!val.hasOwnProperty("type")) return false;
  switch (val.type) {
    case `tconstruct:modifier`:
      if (
        !isItemSpecifier(val.inputs) &&
        !isMultiItemIdentifier(val.inputs) &&
        !(
          Array.isArray(val.inputs) &&
          val.inputs.every((element) => isItemIdentifier(element))
        )
      )
        return false;
      if (!isItemSpecifier(val.tools)) return false;
      if (
        val.requirements !== undefined &&
        !isToolRequirements(val.requirements)
      )
        return false;
      if (
        typeof val.result !== "object" ||
        val.result === null ||
        typeof val.result.level !== "number" ||
        !isTConstructId(val.result.name)
      )
        return false;
      if (val.max_level !== undefined && typeof val.max_level !== "number")
        return false;
      if (
        val.ability_slots !== undefined &&
        typeof val.ability_slots !== "number"
      )
        return false;
      if (
        val.upgrade_slots !== undefined &&
        typeof val.upgrade_slots !== "number"
      )
        return false;
      return true;
    case `tconstruct:incremental_modifier`:
      if (!isItemIdentifier(val.input)) return false;
      if (typeof val.amount_per_item !== "number") return false;
      if (typeof val.needed_per_level !== "number") return false;
      if (val.leftover !== undefined && !isId(val.leftover)) return false;
      if (
        typeof val.result !== "object" ||
        val.result === null ||
        typeof val.result.level !== "number" ||
        !isTConstructId(val.result.name)
      )
        return false;
      if (val.max_level !== undefined && typeof val.max_level !== "number")
        return false;

      if (
        val.upgrade_slots !== undefined &&
        typeof val.upgrade_slots !== "number"
      )
        return false;
      return true;
    default:
      return false;
  }
}

type Props = { recipes: ModifierRecipe[] };
type State = Record<string, never>;
export default class IndexPage extends React.Component<Props, State> {
  render(): JSX.Element {
    return (
      <ul>
        {this.props.recipes.map((recipe, idx) => (
          <li key={idx}>
            <span>{recipe.result.name}</span>
          </li>
        ))}
      </ul>
    );
  }
}

function getJsonRequest<JSONType = any>(url: string) {
  return new Promise<JSONType>((resolve, reject) => {
    https
      .get(url, (response) => {
        const statusCode = response.statusCode;

        if (statusCode !== 200) {
          const error = new Error(
            `Request to ${url} Failed.\nStatus Code: ${statusCode}`
          );
          console.error(error);
          response.resume();
          return;
        }

        response.setEncoding("utf8");
        let rawData = "";
        response.on("data", (chunk) => {
          rawData += chunk;
        });
        response.on("end", () => {
          try {
            resolve(JSON.parse(rawData) as JSONType);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", (error) => reject(error));
  });
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const octokit = new Octokit({
    auth: "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",
  });

  const owner = "SlimeKnights";
  const repo = "TinkersConstruct";
  const tags = await octokit.request("GET /repos/{owner}/{repo}/tags", {
    owner,
    repo,
  });
  if (!tags.data[0]?.commit) {
    return { props: { data: "ERROR" } };
  }
  const tree_sha = tags.data[0]?.commit.sha;

  const tree = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner,
      recursive: "true",
      repo,
      tree_sha,
    }
  );

  const modifierBasePath =
    "src/generated/resources/data/tconstruct/recipes/tools/modifiers/";

  const modifierPaths: string[] = tree.data.tree
    .filter(
      (leaf) =>
        leaf.path !== undefined &&
        leaf.path.startsWith(modifierBasePath) &&
        leaf.path.endsWith(".json")
    )
    .map((leaf) => leaf.path ?? "");

  const recipes: ModifierRecipe[] = [];
  let artificialRequestLimiter = 10;
  const recipeRequests = modifierPaths.map((path) => {
    if (--artificialRequestLimiter < 0) return Promise.resolve(undefined);
    const promise = getJsonRequest(
      `https://raw.githubusercontent.com/${owner}/${repo}/${tree_sha}/${path}`
    );
    promise.then((recipe) => {
      if (isModifierRecipe(recipe)) {
        recipes.push(recipe);
      } else {
        console.debug(`not a modifier recipe: ${path}`);
      }
    });
    return promise;
  });
  await Promise.allSettled(recipeRequests);

  return {
    props: {
      recipes,
    },
  };
};
