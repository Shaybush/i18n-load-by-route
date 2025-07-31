import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import I18nDebug from "../I18nDebug";

export default function BaseLayout() {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV;

  return (
    <div>
      <LanguageSwitcher />
      <Outlet />
      {isDev && <I18nDebug />}
    </div>
  );
}
