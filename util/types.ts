/* eslint-disable @typescript-eslint/no-explicit-any */

export type RecipesJSON = {
  abilityRecipes: NormalModifierRecipe[];
  slotlessRecipes: AnyModifierRecipe[];
  upgradeRecipes: NormalModifierRecipe[];
};

export type MinecraftId = `minecraft:${string}`;
export type TConstructId = `tconstruct:${string}`;
export type ForgeId = `forge:${string}`;

export type Id = MinecraftId | ForgeId | MinecraftId;

export type ItemIdentifier = { item: Id } | { tag: Id };
export function getItemIdentifierId(identifier: ItemIdentifier) {
  if (identifier.hasOwnProperty("item")) {
    return (identifier as { item: Id }).item;
  } else {
    return (identifier as { tag: Id }).tag;
  }
}

export type MultiItemIdentifier = {
  ingredient: ItemIdentifier[];
};

export type ItemSpecifier =
  | ItemIdentifier
  | {
      type: `mantle:without`;
      base: ItemSpecifier;
      without: ItemIdentifier | ItemIdentifier[];
    }
  | {
      type: `mantle:intersection`;
      ingredients: ItemIdentifier[];
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

export type ModifierRecipe = {
  type: `tconstruct:modifier`;
  inputs: (ItemSpecifier | MultiItemIdentifier)[];
  tools: ItemSpecifier;
  requirements?: ToolRequirements;
  result: {
    name: TConstructId;
    level: number;
  };
  max_level?: number;
  slots?: {
    abilities?: number;
    upgrades?: number;
  };
};

export type IncrementalModifierRecipe = {
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
  slots: {
    upgrades: number;
  };
};

export type OverslimeModifierRecipe = {
  type: `tconstruct:overslime_modifier`;
  ingredient: ItemIdentifier;
  restore_amount: number;
};

export type RemoveModifierRecipe = {
  type: `tconstruct:remove_modifier`;
  ingredient: ItemIdentifier;
  container: Id;
};

export type NormalModifierRecipe = ModifierRecipe | IncrementalModifierRecipe;
export type AnyModifierRecipe =
  | NormalModifierRecipe
  | OverslimeModifierRecipe
  | RemoveModifierRecipe;

export function isMultiItemIdentifier(val: any): val is MultiItemIdentifier {
  const result =
    typeof val === "object" &&
    val !== null &&
    Array.isArray(val.ingredient) &&
    val.ingredient.every((element: any) => isItemIdentifier(element));
  return result;
}

export function isItemSpecifier(val: any): val is ItemSpecifier {
  let result = isItemIdentifier(val);
  result =
    result ||
    (typeof val === "object" &&
      val !== null &&
      val.type === `mantle:without` &&
      (isItemIdentifier(val.without) ||
        (Array.isArray(val.without) &&
          val.without.every((element: any) => isItemIdentifier(element)) &&
          isItemSpecifier(val.base))));
  result =
    result ||
    (typeof val === "object" &&
      val !== null &&
      val.type === `mantle:intersection` &&
      Array.isArray(val.ingredients) &&
      val.ingredients.every((element: any) => isItemIdentifier(element)));
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

export function isOverslimeModifierRecipe(
  val: any
): val is OverslimeModifierRecipe {
  if (typeof val !== "object") return false;
  if (val.type !== `tconstruct:overslime_modifier`) return false;
  if (typeof val.restore_amount !== "number") return false;
  if (!isItemIdentifier(val.ingredient)) return false;
  return true;
}

export function isRemoveModifierRecipe(val: any): val is RemoveModifierRecipe {
  if (typeof val !== "object") return false;
  if (val.type !== `tconstruct:remove_modifier`) return false;
  if (!isId(val.container)) return false;
  if (!isItemIdentifier(val.ingredient)) return false;
  return true;
}

export function isIncrementalModifierRecipe(
  val: any
): val is IncrementalModifierRecipe {
  if (typeof val !== "object") return false;
  if (typeof val.amount_per_item !== "number") return false;
  if (typeof val.needed_per_level !== "number") return false;
  if (val.leftover !== undefined && !isId(val.leftover)) return false;
  if (!isItemIdentifier(val.input)) return false;
  if (
    typeof val.result !== "object" ||
    val.result === null ||
    typeof val.result.level !== "number" ||
    !isTConstructId(val.result.name)
  )
    return false;
  if (val.max_level !== undefined && typeof val.max_level !== "number")
    return false;

  if (val.slots === undefined || typeof val.slots !== "object") return false;
  if (typeof val.slots.upgrades !== "number") return false;
  return true;
}

export function isModifierRecipe(val: any): val is ModifierRecipe {
  if (typeof val !== "object") return false;
  if (
    !isItemSpecifier(val.inputs) &&
    !isMultiItemIdentifier(val.inputs) &&
    !(
      Array.isArray(val.inputs) &&
      val.inputs.every(
        (element: any) =>
          isMultiItemIdentifier(element) || isItemSpecifier(element)
      )
    )
  ) {
    return false;
  }
  if (!isItemSpecifier(val.tools)) {
    return false;
  }
  if (val.requirements !== undefined && !isToolRequirements(val.requirements))
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
    val.slots?.abilities !== undefined &&
    typeof val.slots?.abilities !== "number"
  )
    return false;
  if (
    val.slots?.upgrades !== undefined &&
    typeof val.slots?.upgrades !== "number"
  )
    return false;
  return true;
}

export function isAnyModifierRecipe(val: any): val is AnyModifierRecipe {
  if (typeof val !== "object" || val === null) return false;
  if (!val.hasOwnProperty("type")) return false;

  return (
    isNormalModifierRecipe(val) ||
    isOverslimeModifierRecipe(val) ||
    isRemoveModifierRecipe(val)
  );
}

export function isNormalModifierRecipe(val: any): val is NormalModifierRecipe {
  return isModifierRecipe(val) || isIncrementalModifierRecipe(val);
}
