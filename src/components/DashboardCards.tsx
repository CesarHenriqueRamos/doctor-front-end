import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserInjured, FaCalendarCheck, FaExclamationCircle } from "react-icons/fa";

const DashboardCards: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition">
        <div className="text-gray-400 text-sm">{t("activePatients")}</div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-3xl font-bold text-indigo-600">120</p>
          <div className="bg-indigo-50 p-3 rounded-full">
            <FaUserInjured className="text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition">
        <div className="text-gray-400 text-sm">{t("appointmentsToday")}</div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-3xl font-bold text-green-600">35</p>
          <div className="bg-green-50 p-3 rounded-full">
            <FaCalendarCheck className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition">
        <div className="text-gray-400 text-sm">{t("pendingApprovals")}</div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-3xl font-bold text-red-600">8</p>
          <div className="bg-red-50 p-3 rounded-full">
            <FaExclamationCircle className="text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
