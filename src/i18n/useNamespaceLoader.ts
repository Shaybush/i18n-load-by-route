import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { loadOnlyCurrentNamespace } from './loadNamespaceForCurrentLang';

// Map of available languages - you can extend this as needed
const AVAILABLE_LANGUAGES = ['en', 'he'] as const;
type Language = typeof AVAILABLE_LANGUAGES[number];

/**
 * React hook that automatically loads and manages a namespace for the current language.
 * Automatically reloads when the language changes.
 * 
 * @param namespace - The i18n namespace to manage
 * @param localeModules - Object mapping language codes to locale objects
 * @returns Object with loading utilities and current language
 */
export const useNamespaceLoader = (
    namespace: string,
    localeModules: Record<Language, Record<string, any>>
) => {
    const { i18n } = useTranslation();

    const loadNamespace = useCallback(() => {
        loadOnlyCurrentNamespace(namespace, localeModules);
    }, [namespace, localeModules]);

    // Load the namespace initially
    useEffect(() => {
        loadNamespace();
    }, [loadNamespace]);

    // Listen for language changes and reload the namespace
    useEffect(() => {
        const handleLanguageChange = () => {
            loadNamespace();
        };

        // Listen to i18next language change event
        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n, loadNamespace]);

    return {
        currentLanguage: i18n.language,
        reloadNamespace: loadNamespace,
    };
};

/**
 * Simpler hook for one-time namespace loading (for use in route loaders)
 * 
 * @param namespace - The i18n namespace to load
 * @param localeModules - Object mapping language codes to locale objects
 */
export const useNamespaceOnce = (
    namespace: string,
    localeModules: Record<Language, Record<string, any>>
) => {
    useEffect(() => {
        loadOnlyCurrentNamespace(namespace, localeModules);
    }, []); // Only run once on mount
};