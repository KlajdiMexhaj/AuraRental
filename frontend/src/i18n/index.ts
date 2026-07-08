import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import sq from "./locales/sq.json";
import it from "./locales/it.json";
import pl from "./locales/pl.json";
import de from "./locales/de.json";
import en from "./locales/en.json";

i18n
.use(initReactI18next)
.init({
  resources: {
    sq: { translation: sq },
    it: { translation: it },
    pl: { translation: pl },
    de: { translation: de },
    en: { translation: en }
  },

  lng: window.location.pathname.split("/")[1] || "en",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});


export default i18n;