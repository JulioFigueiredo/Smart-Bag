"use client";

import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { useTranslation } from "react-i18next";

// Importa a configuração do i18n
import "../../config/i18n"; // Ajuste a importação de acordo com a estrutura do seu projeto

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<string>("light");
  const [language, setLanguage] = useState<string>("pt");
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage); // Altera o idioma da aplicação
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title={t("other-settings")} username="Pablo Sanches" />

        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold text-[#1b3c79] mb-6">{t("other-settings")}</h1>

          {/* Preferências do Usuário */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1b3c79] mb-4">{t("theme")}</h2>
            <div className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  {t("theme")}
                </label>
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  className="text-black w-full p-2 border border-gray-300 rounded"
                >
                  <option value="light">{t("light")}</option>
                  <option value="dark">{t("dark")}</option>
                  <option value="system">{t("system")}</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  {t("language")}
                </label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="text-black w-full p-2 border border-gray-300 rounded"
                >
                  <option value="pt">{t("portuguese")}</option>
                  <option value="en">{t("english")}</option>
                  <option value="es">{t("spanish")}</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="text-gray-700 font-semibold mr-4">
                  {t("notifications")}
                </label>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={toggleNotifications}
                  className="h-5 w-5"
                />
              </div>
            </div>
          </section>

          {/* Outros Ajustes */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1b3c79] mb-4">{t("other-settings")}</h2>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">{t("coming-soon")}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
