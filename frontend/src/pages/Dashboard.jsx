import React from "react";
import {
  ClipboardList,
  FileText,
  Hospital,
  BarChart3,
  Activity,
  Users,
  TrendingUp,
  Stethoscope,
} from "lucide-react";

const DASHBOARD_CARDS = [
  {
    label: "Ayurveda Forms",
    value: 16,
    icon: ClipboardList,
    color: "text-green-600 bg-green-100",
    linkText: "View Ayurveda Registers →",
  },
  {
    label: "Common Forms",
    value: 8,
    icon: FileText,
    color: "text-blue-600 bg-blue-100",
    linkText: "Open Common Forms →",
  },
  {
    label: "Hospital Forms",
    value: 4,
    icon: Hospital,
    color: "text-red-600 bg-red-100",
    linkText: "Open Hospital Section →",
  },
  {
    label: "Reports",
    value: 12,
    icon: BarChart3,
    color: "text-purple-600 bg-purple-100",
    linkText: "Open Reports →",
  },
  {
    label: "Patients Today",
    value: 24,
    icon: Users,
    color: "text-cyan-600 bg-cyan-100",
    linkText: "View Daily Entries →",
  },
  {
    label: "Treatments Done",
    value: 11,
    icon: Stethoscope,
    color: "text-orange-600 bg-orange-100",
    linkText: "View Treatment Logs →",
  },
];

const DashboardCard = ({ label, value, icon: Icon, color, linkText }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-md font-semibold text-gray-700">{label}</h3>

        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="text-4xl font-bold text-gray-800 mb-3">{value}</div>

      <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
        {linkText}
      </button>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Ayurveda Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome to Ayurveda Service Management System
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {DASHBOARD_CARDS.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Weekly Activity
          </h3>

          <div className="h-64 bg-gray-50 rounded-lg border flex items-center justify-center relative">
            <TrendingUp className="w-12 h-12 text-blue-300 absolute opacity-30" />
            <span className="text-gray-400">Graph Placeholder</span>
          </div>
        </div>

        {/* Yearly */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Yearly Records
          </h3>

          <div className="h-64 flex items-end justify-around bg-gray-50 rounded-lg border px-4">
            {[3, 6, 4, 7, 5, 2, 8, 4].map((height, index) => (
              <div
                key={index}
                style={{ height: `${height * 10}%` }}
                className="w-8 bg-indigo-400 rounded-t-md hover:bg-indigo-500 transition"
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-5">
            Department Overview
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-green-50">
              <Activity className="mb-2 text-green-600" />
              <p className="font-semibold">Pancha Karma</p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50">
              <Users className="mb-2 text-blue-600" />
              <p className="font-semibold">Senior Citizen</p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50">
              <Hospital className="mb-2 text-orange-600" />
              <p className="font-semibold">Emergency</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-50">
              <BarChart3 className="mb-2 text-purple-600" />
              <p className="font-semibold">Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;