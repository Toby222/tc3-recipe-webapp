import Translations from "../data/lang.json";

export function getTranslation(
  key: string,
  lang: keyof typeof Translations = "en_us"
) {
  if (!(lang in Translations)) return key;

  const langFile = Translations as Record<
    keyof typeof Translations,
    Record<string, string>
  >;

  return langFile[lang][key] ?? langFile["en_us"][key] ?? key;
}
