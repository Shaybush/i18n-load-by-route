import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const storedLang = typeof window !== 'undefined' && localStorage.getItem('lang');
const defaultLng = (storedLang as string) || 'en';

void i18n
  .use(initReactI18next)
  .init({
    lng: defaultLng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {},
  });

export default i18n;
