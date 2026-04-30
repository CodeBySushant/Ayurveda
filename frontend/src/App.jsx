// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import "./App.css";

/* Core Pages */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { NAV_ITEMS } from "./data/NavItems";
import SidebarItem from "./components/SidebarItem";

/* Ayurveda Service Register */
import AkupancharServiceRegisterCreate from "./pages/AyurvedaServiceRegister/AkupancharServiceRegisterCreate";
import AkupancharServiceRegisterDailyList from "./pages/AyurvedaServiceRegister/AkupancharServiceRegisterDailyList";
import JesthaNagarikRegisterCreate from "./pages/AyurvedaServiceRegister/JesthaNagarikRegisterCreate";
import JesthaNagarikRegisterDailyList from "./pages/AyurvedaServiceRegister/JesthaNagarikRegisterDailyList";
import KsharsutraServiceIndex from "./pages/AyurvedaServiceRegister/KsharsutraServiceIndex";
import KsharsutraServiceRegisterCreate from "./pages/AyurvedaServiceRegister/KsharsutraServiceRegisterCreate";
import MaternalAndChildHealthRegisterCreate from "./pages/AyurvedaServiceRegister/MaternalAndChildHealthRegisterCreate";
import MaternalAndChildHealthRegisterDailyList from "./pages/AyurvedaServiceRegister/MaternalAndChildHealthRegisterDailyList";
import PanchaKarmaServiceRegisterCreate from "./pages/AyurvedaServiceRegister/PanchaKarmaServiceRegisterCreate";
import PanchaKarmaServiceRegisterDailyList from "./pages/AyurvedaServiceRegister/PanchaKarmaServiceRegisterDailyList";
import PhysiotherapyServiceRegisterCreate from "./pages/AyurvedaServiceRegister/PhysiotherapyServiceRegisterCreate";
import PhysiotherapyServiceRegisterDailyList from "./pages/AyurvedaServiceRegister/PhysiotherapyServiceRegisterDailyList";
import SurgeryServiceRegisterCreate from "./pages/AyurvedaServiceRegister/SurgeryServiceRegisterCreate";
import SurgeryServiceRegisterDailyList from "./pages/AyurvedaServiceRegister/SurgeryServiceRegisterDailyList";
import TherapeuticServiceRegisterCreate from "./pages/AyurvedaServiceRegister/TherapeuticServiceRegisterCreate";
import TherapeuticServiceRegisterDailyList from "./pages/AyurvedaServiceRegister/TherapeuticServiceRegisterDailyList";

/* Common Forms */
import AdditionalServiceBillingCreate from "./pages/CommonForms/AdditionalServiceBillingCreate";
import AdditionalServiceBillingDailyList from "./pages/CommonForms/AdditionalServiceBillingDailyList";
import MasterRegisterCreate from "./pages/CommonForms/MasterRegisterCreate";
import MasterRegisterDailyList from "./pages/CommonForms/MasterRegisterDailyList";
import ReferralSlip from "./pages/CommonForms/ReferralSlip";
import ReferralSlipList from "./pages/CommonForms/ReferralSlipList";
import ReturnSlip from "./pages/CommonForms/ReturnSlip";
import ReturnSlipDailyList from "./pages/CommonForms/ReturnSlipDailyList";

/* Hospital Registration */
import EmergencyServiceRegisterCreate from "./pages/HospitalRegistration/EmergencyServiceRegisterCreate";
import EmergencyServiceRegisterDailyList from "./pages/HospitalRegistration/EmergencyServiceRegisterDailyList";
import PatientAdmissionRegister from "./pages/HospitalRegistration/PatientAdmissionRegister";
import PatientAdmissionRegisterIndex from "./pages/HospitalRegistration/PatientAdmissionRegisterIndex";

/* Reports */
import AkupancharServiceReport from "./pages/Report/AkupancharServiceReport";
import DailyCollectionReport from "./pages/Report/DailyCollectionReport";
import ElderPersonServiceReport from "./pages/Report/ElderPersonServiceReport";
import HospitalMorbidityReport from "./pages/Report/HospitalMorbidityReport";
import MasterRegisterReport1 from "./pages/Report/MasterRegisterReport1";
import MasterRegisterReport2 from "./pages/Report/MasterRegisterReport2";
import MaternalAndChildReport from "./pages/Report/MaternalAndChildReport";
import PhysiotherapyServiceReport from "./pages/Report/PhysiotherapyServiceReport";
import ReturnServiceBillingList from "./pages/Report/ReturnServiceBillingList";
import ServiceBillingList from "./pages/Report/ServiceBillingList";
import SurgeryServiceReport from "./pages/Report/SurgeryServiceReport";
import TherapeuticServiceReport from "./pages/Report/TherapeuticServiceReport";

/* ---------------- Layout ---------------- */
function Layout() {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const activeLink = location.pathname;

  const handleToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Ayurveda System</h2>

        <input
          type="text"
          placeholder="मेनु खोज्नुहोस्..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />

        <nav>
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              openMenu={openMenu}
              handleToggle={handleToggle}
              searchTerm={searchTerm}
              activeLink={activeLink}
            />
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Disabled for Now */}
        {/* <Route path="/" element={<Login />} /> */}

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Ayurveda Register */}
          <Route
            path="aku-create"
            element={<AkupancharServiceRegisterCreate />}
          />
          <Route
            path="aku-list"
            element={<AkupancharServiceRegisterDailyList />}
          />
          <Route
            path="jestha-create"
            element={<JesthaNagarikRegisterCreate />}
          />
          <Route
            path="jestha-list"
            element={<JesthaNagarikRegisterDailyList />}
          />
          <Route path="ksharsutra" element={<KsharsutraServiceIndex />} />
          <Route
            path="ksharsutra-create"
            element={<KsharsutraServiceRegisterCreate />}
          />
          <Route
            path="maternal-create"
            element={<MaternalAndChildHealthRegisterCreate />}
          />
          <Route
            path="maternal-list"
            element={<MaternalAndChildHealthRegisterDailyList />}
          />
          <Route
            path="pancha-create"
            element={<PanchaKarmaServiceRegisterCreate />}
          />
          <Route
            path="pancha-list"
            element={<PanchaKarmaServiceRegisterDailyList />}
          />
          <Route
            path="physio-create"
            element={<PhysiotherapyServiceRegisterCreate />}
          />
          <Route
            path="physio-list"
            element={<PhysiotherapyServiceRegisterDailyList />}
          />
          <Route
            path="surgery-create"
            element={<SurgeryServiceRegisterCreate />}
          />
          <Route
            path="surgery-list"
            element={<SurgeryServiceRegisterDailyList />}
          />
          <Route
            path="therapy-create"
            element={<TherapeuticServiceRegisterCreate />}
          />
          <Route
            path="therapy-list"
            element={<TherapeuticServiceRegisterDailyList />}
          />

          {/* Common Forms */}
          <Route path="master-create" element={<MasterRegisterCreate />} />
          <Route path="master-list" element={<MasterRegisterDailyList />} />
          <Route
            path="billing-create"
            element={<AdditionalServiceBillingCreate />}
          />
          <Route
            path="billing-list"
            element={<AdditionalServiceBillingDailyList />}
          />
          <Route path="referral" element={<ReferralSlip />} />
          <Route path="referral-list" element={<ReferralSlipList />} />
          <Route path="return-slip" element={<ReturnSlip />} />
          <Route path="return-list" element={<ReturnSlipDailyList />} />

          {/* Hospital */}
          <Route
            path="emergency-create"
            element={<EmergencyServiceRegisterCreate />}
          />
          <Route
            path="emergency-list"
            element={<EmergencyServiceRegisterDailyList />}
          />
          <Route
            path="patient-admission"
            element={<PatientAdmissionRegister />}
          />
          <Route
            path="patient-admission-list"
            element={<PatientAdmissionRegisterIndex />}
          />

          {/* Reports */}
          <Route path="aku-report" element={<AkupancharServiceReport />} />
          <Route path="daily-report" element={<DailyCollectionReport />} />
          <Route path="elder-report" element={<ElderPersonServiceReport />} />
          <Route path="hospital-report" element={<HospitalMorbidityReport />} />
          <Route path="master-report-1" element={<MasterRegisterReport1 />} />
          <Route path="master-report-2" element={<MasterRegisterReport2 />} />
          <Route path="maternal-report" element={<MaternalAndChildReport />} />
          <Route
            path="physio-report"
            element={<PhysiotherapyServiceReport />}
          />
          <Route path="return-report" element={<ReturnServiceBillingList />} />
          <Route path="service-report" element={<ServiceBillingList />} />
          <Route path="surgery-report" element={<SurgeryServiceReport />} />
          <Route path="therapy-report" element={<TherapeuticServiceReport />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
