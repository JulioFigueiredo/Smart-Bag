"use client";

import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("pt-BR");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title="Configurações" username="Pablo Sanches" />

        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold text-[#1b3c79] mb-6">Configurações Gerais</h1>

          {/* Preferências do Usuário */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1b3c79] mb-4">
              Preferências do Usuário
            </h2>
            <div className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Tema do Sistema
                </label>
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  className="text-black w-full p-2 border border-gray-300 rounded"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="system">Automático (Baseado no Sistema)</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Idioma Preferido
                </label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className=" text-black w-full p-2 border border-gray-300 rounded"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">Inglês (EUA)</option>
                  <option value="es-ES">Espanhol</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 font-semibold mr-4">
                  Notificações Ativadas
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
            <h2 className="text-xl font-semibold text-[#1b3c79] mb-4">Outros Ajustes</h2>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">Mais opções estarão disponíveis em breve.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
