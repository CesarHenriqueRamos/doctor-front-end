import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Traduções
const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      patients: "Patients",
      doctors: "Doctors",
      workflows: "Workflows",
      activePatients: "Active Patients",
      appointmentsToday: "Appointments Today",
      pendingApprovals: "Pending Approvals",
      logout: "Logout",
    }
  },
  pt: {
    translation: {
      dashboard: "Painel",
      patients: "Pacientes",
      doctors: "Médicos",
      workflows: "Fluxos",
      activePatients: "Pacientes Ativos",
      appointmentsToday: "Consultas Hoje",
      pendingApprovals: "Pendentes",
      logout: "Sair",
    }
  },
  es: {
    translation: {
      dashboard: "Tablero",
      patients: "Pacientes",
      doctors: "Doctores",
      workflows: "Flujos",
      activePatients: "Pacientes Activos",
      appointmentsToday: "Citas Hoy",
      pendingApprovals: "Pendientes",
      logout: "Cerrar sesión",
    }
  }
};

i18n
  .use(LanguageDetector) // detecta idioma automaticamente
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // idioma padrão
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
