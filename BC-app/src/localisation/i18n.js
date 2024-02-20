import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from './languages/en-lang.json';
import RU from './languages/ru-lang.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            EN: {
                translation: EN,
            },
            RU: {
                translation: RU,
            },
        },
        lng: localStorage.getItem("language"),
        fallbackLng: 'EN',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;