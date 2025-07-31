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
    debug: true, // Enable debug logging
  });

// Add event listeners to track resource loading
i18n.on('languageChanged', (lng) => {
  console.log('🌐 Language changed to:', lng);
  console.log('📦 Currently loaded resources:', i18n.services.resourceStore.data);
});

i18n.on('loaded', (loaded) => {
  console.log('📚 Resources loaded:', loaded);
});

// Make i18n available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).i18n = i18n;
}

export default i18n;
