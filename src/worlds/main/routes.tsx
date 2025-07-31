import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import i18n from "../../i18n/i18n";
import en from "./locales/en";
import he from "./locales/he";

const MainPage = lazy(() => import("./MainPage"));

export const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    loader: async () => {
      if (!i18n.hasResourceBundle("en", "main")) {
        i18n.addResourceBundle("en", "main", en);
      }
      if (!i18n.hasResourceBundle("he", "main")) {
        i18n.addResourceBundle("he", "main", he);
      }
      return null;
    },
  },
];
