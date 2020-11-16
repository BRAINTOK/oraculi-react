import i18next from 'i18next';

const ru_orig = require("../config/ru-RU.json");
// const ru_model = require("./config/model_ru_1.json");
// const en = require("./en-EN.json");



i18next
    .init({
            keySeparator: "",
			nsSeparator: "",
        interpolation: {
            // React already does escaping
            escapeValue: false,

        },
        lng: 'ru', // 'en' | 'ru'
        // Using simple hardcoded resources for simple example
        resources: {
            // en: {
            //     translation: en,
            // },
            ru: {
                translation: ru_orig

            },

        },
    });
export default i18next;