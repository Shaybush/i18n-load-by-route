import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { loadOnlyCurrentNamespace } from "../../i18n/loadNamespaceForCurrentLang";
import en from "./locales/en";
import he from "./locales/he";

const MainPage = lazy(() => import("./MainPage"));

export const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    loader: async () => {
      loadOnlyCurrentNamespace("main", { en, he });
      return null;
    },
  },
];
