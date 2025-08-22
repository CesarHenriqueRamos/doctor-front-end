import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Workflows from "./pages/Workflows";
import PatientDetails from "./pages/PatientDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetails />} /> 
          <Route path="doctors" element={<Doctors />} />
          <Route path="workflows" element={<Workflows />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
