import { useTranslation } from "react-i18next";
import { useNamespaceLoader } from "../../i18n/useNamespaceLoader";
import en from "./locales/en";
import he from "./locales/he";

export default function SettingsPage() {
  // This hook automatically reloads the namespace when language changes
  useNamespaceLoader("settings", { en, he });

  const { t } = useTranslation("settings");
  return <h1>{t("title")}</h1>;
}
