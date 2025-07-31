import { useTranslation } from "react-i18next";

export default function MainPage() {
  const { t } = useTranslation("main");
  return <h1 className="bg-red-500">{t("title")}</h1>;
}
