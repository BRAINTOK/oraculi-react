import i18next, { useTranslation } from 'i18next';
const ru_orig = require("../../config/ru-RU.json");
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
export function __(text)
{
	//const { t, i18n } = useTranslation('ns1');
	//return t(text);	
	return i18next.t(text);
}