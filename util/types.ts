/* eslint-disable @typescript-eslint/no-explicit-any */

export type RecipesJSON = Record<
  "abilityRecipes" | "slotlessRecipes" | "upgradeRecipes",
  Record<string, ModifierRecipe>
>;

export type MinecraftId = `minecraft:${string}`;
export type TConstructId = `tconstruct:${string}`;
export type ForgeId = `forge:${string}`;

export type Id = MinecraftId | ForgeId | MinecraftId;

export type ItemIdentifier = { item: Id } | { tag: Id };
export type MultiItemIdentifier = {
  ingredient: ItemIdentifier[];
};

export type ItemSpecifier =
  | ItemIdentifier
  | {
      type: `mantle:without`;
      base: ItemSpecifier;
      without: ItemIdentifier | ItemIdentifier[];
    };

export type ToolRequirementsBasic = {
  name: string;
  level: number;
  error: string;
};
export type ToolRequirements =
  | ToolRequirementsBasic
  | {
      options: {
        name: string;
        level: number;
      }[];
      matches_needed: number;
      error: string;
    };

export type ModifierRecipe =
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

export function isMultiItemIdentifier(val: any): val is MultiItemIdentifier {
  const result =
    typeof val === "object" &&
    val !== null &&
    Array.isArray(val.ingredient) &&
    val.ingredient.every((element: any) => isItemIdentifier(element));
  return result;
}

export function isItemSpecifier(val: any): val is ItemSpecifier {
  const result =
    isItemIdentifier(val) ||
    (typeof val === "object" &&
      val !== null &&
      val.type === `mantle:without` &&
      (isItemIdentifier(val.without) ||
        (Array.isArray(val.without) &&
          val.without.every((element: any) => isItemIdentifier(element)))) &&
      isItemSpecifier(val.base));
  return result;
}

export function isToolRequirementsBasic(
  val: any
): val is ToolRequirementsBasic {
  return (
    typeof val === "object" &&
    val !== null &&
    typeof val.name === "string" &&
    typeof val.level === "number" &&
    typeof val.error === "string"
  );
}

export function isToolRequirements(val: any): val is ToolRequirements {
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

export function isItemIdentifier(val: any): val is ItemIdentifier {
  const result =
    typeof val === "object" && val !== null && isId(val.item) !== isId(val.tag);
  return result;
}

export function isMinecraftId(val: any): val is MinecraftId {
  return typeof val === "string" && /minecraft:.+/.test(val);
}
export function isTConstructId(val: any): val is TConstructId {
  return typeof val === "string" && /tconstruct:.+/.test(val);
}
export function isForgeId(val: any): val is ForgeId {
  return typeof val === "string" && /forge:.+/.test(val);
}
export function isId(val: any): val is Id {
  return isMinecraftId(val) || isTConstructId(val) || isForgeId(val);
}

export function isModifierRecipe(val: any): val is ModifierRecipe {
  if (typeof val !== "object" || val === null) return false;
  if (!val.hasOwnProperty("type")) return false;

  switch (val.type) {
    case `tconstruct:modifier`:
      if (
        !isItemSpecifier(val.inputs) &&
        !isMultiItemIdentifier(val.inputs) &&
        !(
          Array.isArray(val.inputs) &&
          val.inputs.every(
            (element: any) =>
              isItemIdentifier(element) ||
              isMultiItemIdentifier(element) ||
              isItemSpecifier(element)
          )
        )
      ) {
        return false;
      }
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
