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

// Track loaded namespaces to reload them when language changes
const loadedNamespaces = new Set<string>();

// Add function to track namespace loading
export const trackNamespaceLoading = (namespace: string) => {
  loadedNamespaces.add(namespace);
};

// Add event listeners to track resource loading
i18n.on('languageChanged', (lng) => {
  console.log('🌐 Language changed to:', lng);
  console.log('📦 Currently loaded resources:', i18n.services.resourceStore.data);

  // Trigger a custom event for namespace reloading
  // This will be handled by the utility function when needed
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('i18n:languageChanged', {
      detail: { language: lng, loadedNamespaces: Array.from(loadedNamespaces) }
    }));
  }
});

i18n.on('loaded', (loaded) => {
  console.log('📚 Resources loaded:', loaded);
});

// Make i18n available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).i18n = i18n;
  (window as any).i18nLoadedNamespaces = loadedNamespaces;
}

export default i18n;
