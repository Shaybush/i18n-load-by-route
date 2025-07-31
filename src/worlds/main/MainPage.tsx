import { useTranslation } from "react-i18next";
import { useNamespaceLoader } from "../../i18n/useNamespaceLoader";
import en from "./locales/en";
import he from "./locales/he";

export default function MainPage() {
  // This hook automatically reloads the namespace when language changes
  useNamespaceLoader("main", { en, he });

  const { t } = useTranslation("main");
  return <h1 className="bg-red-500">{t("title")}</h1>;
}
