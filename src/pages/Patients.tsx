import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PatientCard from "../components/patients/PatientCard"; // ⬅️ importa o card pronto
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

const PatientsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      firstName: "Ana",
      lastName: "Souza",
      birthDate: "10/05/1993",
      gender: "Feminino",
      status: true,
      phone: "(11) 99999-8888",
      condition: "Hipertensão",
      lastVisit: "2025-08-20",
    },
    {
      id: 2,
      firstName: "Carlos",
      lastName: "Mendes",
      birthDate: "15/02/1980",
      gender: "Masculino",
      status: true,
      phone: "(11) 98888-7777",
      condition: "Diabetes",
      lastVisit: "2025-08-18",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Partial<Patient>>({
    status: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.birthDate || !form.phone) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    const newPatient: Patient = {
      id: Date.now(),
      firstName: form.firstName!,
      lastName: form.lastName!,
      birthDate: form.birthDate!,
      gender: form.gender || "",
      status: form.status || false,
      phone: form.phone!,
      email: form.email,
      address: form.address,
      condition: form.condition || "-",
      lastVisit: new Date().toISOString().split("T")[0],
    };

    setPatients([...patients, newPatient]);
    setShowModal(false);
    setForm({ status: true });
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{t("patients")}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {t("addNewPatient")}
        </button>
      </div>

      {/* Lista de pacientes usando PatientCard */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {patients.map((p) => (
    <PatientCard key={p.id} patient={p} />
  ))}
</div>


      {/* Modal Novo Paciente */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <h3 className="text-2xl font-bold mb-4">{t("addNewPatient")}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Primeiro Nome *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName || ""}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Sobrenome *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName || ""}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium">Data de Nascimento *</label>
                <input
                  type="text"
                  name="birthDate"
                  placeholder="dd/mm/aaaa"
                  value={form.birthDate || ""}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Gênero</label>
                <select
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Selecione o gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={form.status || false}
                  onChange={handleChange}
                />
                <label>Status Ativo</label>
              </div>

              <div>
                <label className="block font-medium">Telefone *</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-medium">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={form.address || ""}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Ações */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
