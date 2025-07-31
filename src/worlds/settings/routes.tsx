import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { loadOnlyCurrentNamespace } from "../../i18n/loadNamespaceForCurrentLang";
import en from "./locales/en";
import he from "./locales/he";

const SettingsPage = lazy(() => import("./SettingsPage"));

export const settingsRoutes: RouteObject[] = [
  {
    path: "/settings",
    element: <SettingsPage />,
    loader: async () => {
      loadOnlyCurrentNamespace("settings", { en, he });
      return null;
    },
  },
];
