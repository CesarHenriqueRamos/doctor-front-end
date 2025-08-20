import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
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

        <h1 className="text-xl font-semibold">Dashboard</h1>

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
                    <span className="text-gray-800 font-medium">{lang.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo principal com Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-indigo-700 text-white w-64 p-4 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">MediFlow</h2>
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-indigo-600 ${isActive ? "bg-indigo-800" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-indigo-600 ${isActive ? "bg-indigo-800" : ""}`
              }
            >
              Patients
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-indigo-600 ${isActive ? "bg-indigo-800" : ""}`
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/workflows"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-indigo-600 ${isActive ? "bg-indigo-800" : ""}`
              }
            >
              Workflows
            </NavLink>
          </nav>
        </aside>

        {/* Área de conteúdo */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
