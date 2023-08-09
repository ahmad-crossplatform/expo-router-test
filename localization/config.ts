import { getLocales } from 'expo-localization';
import { I18n, TranslateOptions } from "i18n-js";
import { arabic } from "./arabic";
import { english } from "./english";
import { I18nManager } from "react-native";

export const getLocale = async (): Promise<string> => {
  const locale = getLocales()[0].languageCode;

  const result = locale.slice(0, 2);

  if (result === "ar") {
    console.log("arabic");
    I18nManager.forceRTL(true);
  };
  return result;
};

const i18n = new I18n();
export const translate = (key: string, config?: TranslateOptions) =>
  i18n.t(key, config);


export const setI18nConfig = async () => {
  const l = await getLocale();
  i18n.locale = l;
  i18n.translations = { en: english, ar: arabic };
  i18n.enableFallback = true;
  i18n.defaultLocale = "en";
};
