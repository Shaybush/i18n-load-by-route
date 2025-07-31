import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import I18nDebug from "../I18nDebug";
import Sidebar from "../Sidebar";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function BaseLayout() {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV;
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar isOpen={open} toggle={toggle} />
      <div className="flex-1">
        <header className="p-4 md:hidden bg-gray-100">
          <button onClick={toggle}>
            <FiMenu className="w-6 h-6" />
          </button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <div className="flex-1">{isDev && <I18nDebug />}</div>
    </div>
  );
}
