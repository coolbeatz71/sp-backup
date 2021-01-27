import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import rw from "./rw";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    rw: {
      translation: rw,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ["en", "rw"],
});

export default i18n;
