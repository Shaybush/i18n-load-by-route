import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import en from './locales/en';
import he from './locales/he';

const SettingsPage = lazy(() => import('./SettingsPage'));

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <SettingsPage />,
    loader: async () => {
      if (!i18n.hasResourceBundle('en', 'settings')) {
        i18n.addResourceBundle('en', 'settings', en);
      }
      if (!i18n.hasResourceBundle('he', 'settings')) {
        i18n.addResourceBundle('he', 'settings', he);
      }
      return null;
    },
  },
];
