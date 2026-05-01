// src/App.jsx
import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();
  const activeLink = location.pathname;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        {/* Header: Logo + Title */}
        <div className="sidebar-header">
          {sidebarOpen && (
            <>
              {/* Ayurveda Leaf + Mortar Icon (SVG) */}
              <div className="sidebar-logo">
                <svg
                  viewBox="0 0 40 40"
                  width="38"
                  height="38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Mortar bowl */}
                  <ellipse
                    cx="20"
                    cy="28"
                    rx="11"
                    ry="5"
                    fill="#4ade80"
                    opacity="0.3"
                  />
                  <path
                    d="M10 26 Q20 36 30 26"
                    stroke="#4ade80"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Pestle */}
                  <line
                    x1="27"
                    y1="18"
                    x2="20"
                    y2="28"
                    stroke="#86efac"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Left leaf */}
                  <path
                    d="M20 22 Q10 14 12 6 Q18 10 20 22Z"
                    fill="#22c55e"
                    opacity="0.9"
                  />
                  {/* Right leaf */}
                  <path
                    d="M20 22 Q30 14 28 6 Q22 10 20 22Z"
                    fill="#16a34a"
                    opacity="0.85"
                  />
                  {/* Center vein left leaf */}
                  <path
                    d="M16 8 Q18 14 20 22"
                    stroke="#bbf7d0"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Center vein right leaf */}
                  <path
                    d="M24 8 Q22 14 20 22"
                    stroke="#bbf7d0"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Plus sign */}
                  <circle cx="30" cy="10" r="6" fill="#2563eb" opacity="0.9" />
                  <line
                    x1="30"
                    y1="7"
                    x2="30"
                    y2="13"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="27"
                    y1="10"
                    x2="33"
                    y2="10"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="sidebar-title">
                आयुर्वेद रिपोर्टिंङ्ग प्रणाली
              </span>
            </>
          )}

          {/* Toggle Button */}
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search — only when open */}
        {sidebarOpen && (
          <input
            type="text"
            placeholder="मेनु खोज्नुहोस्..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sidebar-search"
          />
        )}

        {/* Nav */}
        <nav>
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              openMenu={openMenu}
              handleToggle={handleToggle}
              searchTerm={searchTerm}
              activeLink={activeLink}
              collapsed={!sidebarOpen}
            />
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          {sidebarOpen && <span>लग आउट गर्नुहोस्</span>}
        </button>
      </aside>

      {/* Main */}
      <main
        className={`main-content ${sidebarOpen ? "main-expanded" : "main-collapsed"}`}
      >
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

/* ---------------- App ---------------- */
export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Disabled for Now */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
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

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
