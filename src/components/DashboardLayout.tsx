import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Flag from "react-world-flags";

const languageCodes: Record<string, string> = {
  pt: "BR",
  es: "ES",
  en: "US",
};

const DashboardLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();

  // Mapeia rota -> chave de tradução
  const pageTitles: Record<string, string> = {
    "/": "dashboard",
    "/patients": "patients",
    "/doctors": "doctors",
    "/workflows": "workflows",
  };

  // Pega título baseado na rota atual
  const currentTitle =
    pageTitles[location.pathname] || "dashboard";

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md p-4 flex justify-between items-center text-white">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl font-bold"
        >
          ☰
        </button>

        {/* Título dinâmico */}
        <h1 className="text-xl font-semibold">
          {t(currentTitle)}
        </h1>

        <div className="flex items-center gap-4 relative">
          <button className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100 transition">
            {t("logout")}
          </button>

          <div className="relative">
            <Flag
              code={languageCodes[i18n.language]}
              alt={i18n.language}
              style={{ width: 32, height: 32, cursor: "pointer" }}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div
                className="absolute right-0 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                style={{ marginTop: "-0.3rem" }}
              >
                {Object.keys(languageCodes).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left"
                  >
                    <Flag
                      code={languageCodes[lang]}
                      alt={lang}
                      style={{ width: 24, height: 24 }}
                    />
                    <span className="text-gray-800 font-medium">
                      {lang.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-1">
        {sidebarOpen && (
          <aside className="bg-indigo-700 text-white w-64 p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">MediFlow</h2>
            <nav className="flex flex-col gap-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded hover:bg-indigo-600 ${
                    isActive ? "bg-indigo-800" : ""
                  }`
                }
              >
                {t("dashboard")}
              </NavLink>
              <NavLink
                to="/patients"
                className={({ isActive }) =>
                  `px-3 py-2 rounded hover:bg-indigo-600 ${
                    isActive ? "bg-indigo-800" : ""
                  }`
                }
              >
                {t("patients")}
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `px-3 py-2 rounded hover:bg-indigo-600 ${
                    isActive ? "bg-indigo-800" : ""
                  }`
                }
              >
                {t("doctors")}
              </NavLink>
              <NavLink
                to="/workflows"
                className={({ isActive }) =>
                  `px-3 py-2 rounded hover:bg-indigo-600 ${
                    isActive ? "bg-indigo-800" : ""
                  }`
                }
              >
                {t("workflows")}
              </NavLink>
            </nav>
          </aside>
        )}

        <main className="transition-all duration-300 bg-gray-100 overflow-auto flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
