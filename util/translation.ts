import Translations from "../TinkersConstruct/src/main/resources/assets/tconstruct/lang/en_us.json";

export function getTranslation(key: string) {
  if (key.startsWith("__") || !(key in Translations)) return key;
  return Translations[key as keyof typeof Translations];
}
