import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Calendar, Shield, SquarePen, Eye, ArrowLeft, FileText, ClipboardList } from "lucide-react";

interface Patient {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string; // formato YYYY-MM-DD
  phone: string;
  email?: string;
  insurance?: string;
  allergies?: string[];
  chronicConditions?: string[];
}

interface Prescription {
  date: string;
  medication: string;
  dosage: string;
}

interface MedicalRecord {
  date: string;
  observation: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2,"0")}/${date.getFullYear()}`;
};

const PatientDetailsTabs: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"info" | "prescriptions" | "records">("info");

  // Mock API
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const mockPatient: Patient = {
        firstName: "Ana",
        lastName: "Souza",
        age: 32,
        birthDate: "1993-05-10",
        phone: "(11) 99999-8888",
        email: "ana.souza@email.com",
        insurance: "Plano Saúde",
        allergies: ["Amendoim", "Lactose"],
        chronicConditions: ["Hipertensão", "Diabetes"],
      };
      setPatient(mockPatient);

      const mockPrescriptions: Prescription[] = [
        { date: "2025-08-20", medication: "Paracetamol", dosage: "500mg 2x/dia" },
        { date: "2025-08-22", medication: "Losartana", dosage: "50mg 1x/dia" },
      ];
      setPrescriptions(mockPrescriptions);

      const mockRecords: MedicalRecord[] = [
        { date: "2025-08-01", observation: "Consulta de rotina. Pressão arterial controlada." },
        { date: "2025-07-15", observation: "Recomendada dieta balanceada." },
      ];
      setRecords(mockRecords);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p className="text-gray-600">Carregando paciente...</p>;
  if (!patient) return <p className="text-gray-600">Paciente não encontrado.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
      </button>

      {/* Abas */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-2 ${activeTab === "info" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-500"}`}
        >
          Informações
        </button>
        <button
          onClick={() => setActiveTab("prescriptions")}
          className={`pb-2 ${activeTab === "prescriptions" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-500"}`}
        >
          Prescrições
        </button>
        <button
          onClick={() => setActiveTab("records")}
          className={`pb-2 ${activeTab === "records" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-500"}`}
        >
          Prontuário
        </button>
      </div>

      {/* Conteúdo das Abas */}
      {activeTab === "info" && (
        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
            <User className="w-10 h-10 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">{patient.firstName} {patient.lastName}</h2>
              <p className="text-gray-600">Idade: {patient.age}</p>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Nascimento: {formatDate(patient.birthDate)}
              </p>
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              <span>{patient.phone}</span>
            </div>
            {patient.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>{patient.email}</span>
              </div>
            )}
            {patient.insurance && (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-500" />
                <span>Convênio: {patient.insurance}</span>
              </div>
            )}
          </div>

          {/* Alergias e Condições Crônicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patient.allergies && patient.allergies.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <SquarePen className="w-5 h-5 text-red-500" /> Alergias
                </h3>
                <ul className="list-disc list-inside mt-2">
                  {patient.allergies.map((allergy, idx) => (
                    <li key={idx}>{allergy}</li>
                  ))}
                </ul>
              </div>
            )}

            {patient.chronicConditions && patient.chronicConditions.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-500" /> Condições Crônicas
                </h3>
                <ul className="list-disc list-inside mt-2">
                  {patient.chronicConditions.map((condition, idx) => (
                    <li key={idx}>{condition}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          {prescriptions.length === 0 ? (
            <p className="text-gray-600">Nenhuma prescrição encontrada.</p>
          ) : (
            prescriptions.map((presc, idx) => (
              <div key={idx} className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
                <FileText className="w-5 h-5 text-green-500" />
                <div>
                  <p><strong>{presc.medication}</strong> - {presc.dosage}</p>
                  <p className="text-gray-500 text-sm">Data: {formatDate(presc.date)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "records" && (
        <div className="space-y-4">
          {records.length === 0 ? (
            <p className="text-gray-600">Nenhum registro encontrado.</p>
          ) : (
            records.map((rec, idx) => (
              <div key={idx} className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
                <ClipboardList className="w-5 h-5 text-blue-500" />
                <div>
                  <p>{rec.observation}</p>
                  <p className="text-gray-500 text-sm">Data: {formatDate(rec.date)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDetailsTabs;
