// src/config/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Inicialização do i18n com os recursos e as opções
i18n
  .use(initReactI18next) // Passa o i18n para o react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "theme": "Theme",
          "light": "Light",
          "dark": "Dark",
          "language": "Language",
          "notifications": "Notifications",
          "other-settings": "Other Settings",
          "coming-soon": "Coming Soon",
          "portuguese": "Portuguese",
          "english": "English",
          "spanish": "Spanish",
        },
      },
      pt: {
        translation: {
          "theme": "Tema",
          "light": "Claro",
          "dark": "Escuro",
          "language": "Idioma",
          "notifications": "Notificações",
          "other-settings": "Outras Configurações",
          "coming-soon": "Em Breve",
          "portuguese": "Português",
          "english": "Inglês",
          "spanish": "Espanhol",
        },
      },
      es: {
        translation: {
          "theme": "Tema",
          "light": "Claro",
          "dark": "Oscuro",
          "language": "Idioma",
          "notifications": "Notificaciones",
          "other-settings": "Otras Configuraciones",
          "coming-soon": "Próximamente",
          "portuguese": "Portugués",
          "english": "Inglés",
          "spanish": "Español",
        },
      },
    },
    lng: "pt", // Idioma padrão
    fallbackLng: "en", // Idioma de fallback
    interpolation: {
      escapeValue: false, // O React já faz a segurança contra XSS
    },
  });

export default i18n;
