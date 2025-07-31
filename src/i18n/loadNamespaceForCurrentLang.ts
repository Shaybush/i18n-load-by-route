import i18n, { trackNamespaceLoading } from './i18n';

// Map of available languages - you can extend this as needed
const AVAILABLE_LANGUAGES = ['en', 'he'] as const;
type Language = typeof AVAILABLE_LANGUAGES[number];

// Dynamic import function type
type LocaleImport = () => Promise<{ default: Record<string, any> }>;

/**
 * Utility function to load a namespace for the current language only,
 * and clean up resources from other languages to prevent memory bloat.
 * 
 * @param namespace - The i18n namespace to load (e.g., 'main', 'settings')
 * @param localeImports - Object mapping language codes to dynamic imports
 * @returns Promise that resolves when the current language is loaded
 */
export const loadNamespaceForCurrentLang = async (
    namespace: string,
    localeImports: Record<Language, LocaleImport>
): Promise<void> => {
    const currentLang = i18n.language as Language;

    // Remove all other languages for this namespace to free memory
    AVAILABLE_LANGUAGES.forEach(lang => {
        if (lang !== currentLang && i18n.hasResourceBundle(lang, namespace)) {
            i18n.removeResourceBundle(lang, namespace);
            console.log(`🗑️ Removed ${lang}/${namespace} bundle`);
        }
    });

    // Load the current language if not already loaded
    if (!i18n.hasResourceBundle(currentLang, namespace)) {
        try {
            const localeModule = await localeImports[currentLang]();
            i18n.addResourceBundle(currentLang, namespace, localeModule.default);
            console.log(`📦 Loaded ${currentLang}/${namespace} bundle`);
        } catch (error) {
            console.error(`❌ Failed to load ${currentLang}/${namespace}:`, error);
            // Fallback to English if current language fails
            if (currentLang !== 'en' && localeImports.en) {
                const fallbackModule = await localeImports.en();
                i18n.addResourceBundle('en', namespace, fallbackModule.default);
                console.log(`📦 Loaded fallback en/${namespace} bundle`);
            }
        }
    }
};

/**
 * Alternative approach using static imports (if you prefer static imports over dynamic)
 */
export const loadNamespaceForCurrentLangStatic = (
    namespace: string,
    localeModules: Record<Language, Record<string, any>>,
    removeOtherNamespaces: boolean = false
): void => {
    const currentLang = i18n.language as Language;

    if (removeOtherNamespaces) {
        // Remove ALL namespaces for ALL languages (complete cleanup)
        const resourceStore = i18n.services.resourceStore.data;
        AVAILABLE_LANGUAGES.forEach(lang => {
            if (resourceStore[lang]) {
                Object.keys(resourceStore[lang]).forEach(ns => {
                    if (ns !== namespace) {
                        i18n.removeResourceBundle(lang, ns);
                        console.log(`🗑️ Removed ${lang}/${ns} bundle (other namespace)`);
                    }
                });
            }
        });
    }

    // Remove all other languages for this namespace
    AVAILABLE_LANGUAGES.forEach(lang => {
        if (lang !== currentLang && i18n.hasResourceBundle(lang, namespace)) {
            i18n.removeResourceBundle(lang, namespace);
            console.log(`🗑️ Removed ${lang}/${namespace} bundle`);
        }
    });

    // Load the current language if not already loaded
    if (!i18n.hasResourceBundle(currentLang, namespace)) {
        const currentLocale = localeModules[currentLang];
        if (currentLocale) {
            i18n.addResourceBundle(currentLang, namespace, currentLocale);
            trackNamespaceLoading(namespace);
            console.log(`📦 Loaded ${currentLang}/${namespace} bundle`);
        } else {
            console.warn(`⚠️ No locale found for ${currentLang}/${namespace}`);
            // Fallback to English
            const fallbackLocale = localeModules.en;
            if (fallbackLocale) {
                i18n.addResourceBundle('en', namespace, fallbackLocale);
                trackNamespaceLoading(namespace);
                console.log(`📦 Loaded fallback en/${namespace} bundle`);
            }
        }
    } else {
        // Still track it if it was already loaded
        trackNamespaceLoading(namespace);
    }
};

/**
 * Load only the current namespace and remove ALL other namespaces
 * This ensures only one namespace is loaded at a time
 */
export const loadOnlyCurrentNamespace = (
    namespace: string,
    localeModules: Record<Language, Record<string, any>>
): void => {
    loadNamespaceForCurrentLangStatic(namespace, localeModules, true);
};