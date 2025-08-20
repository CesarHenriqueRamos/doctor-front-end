import React from "react";
import DashboardCards from "../components/DashboardCards";

const Dashboard: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <DashboardCards />
  </div>
);

export default Dashboard;
