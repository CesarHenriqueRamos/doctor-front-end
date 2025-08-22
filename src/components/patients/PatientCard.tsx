import React from "react";
import { User, Phone, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  status: boolean;
  phone: string;
  email?: string;
  address?: string;
  condition?: string;
  lastVisit?: string;
}

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();

  const age = new Date().getFullYear() - Number(patient.birthDate.split("/")[2]);

  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <User className="w-10 h-10 text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold">{patient.firstName} {patient.lastName}</h2>
          <p className="text-gray-600">Idade: {age}</p>
          <p className="text-gray-600">Nascimento: {patient.birthDate}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Phone className="w-6 h-6 text-green-500" />
        <p>{patient.phone}</p>
        {patient.email && (
          <>
            <Mail className="w-6 h-6 text-purple-500 ml-4" />
            <p>{patient.email}</p>
          </>
        )}
      </div>

      {patient.condition && (
        <div className="flex items-center space-x-4">
          <Shield className="w-6 h-6 text-yellow-500" />
          <p>Convênio: {patient.condition}</p>
        </div>
      )}

      <button
        onClick={() => navigate(`/patients/${patient.id}`)}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Ver Detalhes
      </button>
    </div>
  );
};

export default PatientCard;
