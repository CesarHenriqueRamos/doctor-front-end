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
      addNewPatient: "Add New Patient",
      birthDate: "Birth Date",
      gender: "Gender",
      phone: "Phone",
      email: "Email",
      address: "Address",
      status: "Status",
      details: "Details",
    },
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
      addNewPatient: "Adicionar Novo Paciente",
      birthDate: "Data de Nascimento",
      gender: "Gênero",
      phone: "Telefone",
      email: "Email",
      address: "Endereço",
      status: "Status",
      details: "Details",
    },
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
      addNewPatient: "Agregar Nuevo Paciente",
      birthDate: "Fecha de Nacimiento",
      gender: "Género",
      phone: "Teléfono",
      email: "Correo electrónico",
      address: "Dirección",
      status: "Estado",
       details: "Detalles",
    },
  },
};

i18n
  .use(LanguageDetector) // detecta idioma automaticamente
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // idioma padrão
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
