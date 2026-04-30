import React, { useState, useEffect, useRef } from "react";
import {
  ClipboardList, FileText, Hospital, BarChart3,
  Users, Stethoscope, TrendingUp, TrendingDown,
  Activity, ArrowUpRight, Calendar, Bell, Search,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart,
  Pie, Cell, Legend,
} from "recharts";

/* ── Data ── */
const weeklyData = [
  { day: "आइत", patients: 18, treatments: 12 },
  { day: "सोम", patients: 32, treatments: 24 },
  { day: "मंगल", patients: 27, treatments: 19 },
  { day: "बुध", patients: 41, treatments: 31 },
  { day: "बिही", patients: 35, treatments: 28 },
  { day: "शुक्र", patients: 48, treatments: 36 },
  { day: "शनि", patients: 22, treatments: 15 },
];

const monthlyData = [
  { month: "बैशाख", registrations: 120, services: 98 },
  { month: "जेठ", registrations: 145, services: 112 },
  { month: "असार", registrations: 98, services: 85 },
  { month: "साउन", registrations: 167, services: 134 },
  { month: "भदौ", registrations: 134, services: 109 },
  { month: "असोज", registrations: 189, services: 156 },
  { month: "कार्तिक", registrations: 201, services: 178 },
  { month: "मंसिर", registrations: 176, services: 143 },
  { month: "पुष", registrations: 158, services: 127 },
  { month: "माघ", registrations: 143, services: 118 },
  { month: "फाल्गुन", registrations: 192, services: 164 },
  { month: "चैत", registrations: 215, services: 187 },
];

const departmentData = [
  { name: "पञ्चकर्म", value: 28, color: "#10b981" },
  { name: "अकुपञ्चर", value: 18, color: "#3b82f6" },
  { name: "फिजियोथेरेपी", value: 22, color: "#f59e0b" },
  { name: "शल्य चिकित्सा", value: 12, color: "#ef4444" },
  { name: "जेष्ठ नागरिक", value: 20, color: "#8b5cf6" },
];

const CARDS = [
  { label: "आयुर्वेद फारमहरू", value: 16, icon: ClipboardList, color: "#10b981", bg: "rgba(16,185,129,0.1)", trend: +12 },
  { label: "साझा फारमहरू", value: 8, icon: FileText, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", trend: +5 },
  { label: "अस्पताल फारमहरू", value: 4, icon: Hospital, color: "#ef4444", bg: "rgba(239,68,68,0.1)", trend: 0 },
  { label: "रिपोर्टहरू", value: 12, icon: BarChart3, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", trend: +8 },
  { label: "आजका बिरामी", value: 24, icon: Users, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", trend: +3 },
  { label: "उपचार सम्पन्न", value: 11, icon: Stethoscope, color: "#06b6d4", bg: "rgba(6,182,212,0.1)", trend: -2 },
];

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1e2330",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        padding: "10px 16px",
        fontSize: "13px",
        color: "#f3f4f6",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}>
        <p style={{ fontWeight: 600, marginBottom: 6, color: "#94a3b8" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "2px 0" }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ── Animated Counter ── */
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return count;
}

const AnimatedValue = ({ value }) => {
  const count = useCountUp(value);
  return <span>{count}</span>;
};

/* ── Stat Card ── */
const StatCard = ({ label, value, icon: Icon, color, bg, trend, index }) => (
  <div style={{
    background: "#ffffff",
    borderRadius: "16px",
    padding: "22px 24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
    position: "relative",
    overflow: "hidden",
    animation: `fadeSlideUp 0.5s ease both`,
    animationDelay: `${index * 0.08}s`,
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
  }}
  >
    {/* Background accent */}
    <div style={{
      position: "absolute", top: -20, right: -20,
      width: 90, height: 90, borderRadius: "50%",
      background: bg, opacity: 0.6,
    }} />

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
      <div style={{
        width: 42, height: 42, borderRadius: "12px",
        background: bg, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} style={{ color }} />
      </div>
      {trend !== 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 3,
          fontSize: "12px", fontWeight: 600,
          color: trend > 0 ? "#10b981" : "#ef4444",
          background: trend > 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
          padding: "3px 8px", borderRadius: "20px",
        }}>
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>

    <div style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", lineHeight: 1, marginBottom: 6 }}>
      <AnimatedValue value={value} />
    </div>
    <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{label}</div>
  </div>
);

/* ── Main Dashboard ── */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .dashboard-root * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .recharts-cartesian-axis-tick-value {
          font-size: 11px !important;
          fill: #94a3b8 !important;
        }

        .tab-btn {
          padding: 7px 18px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .tab-btn.active {
          background: #1e2330;
          color: #fff;
        }
        .tab-btn.inactive {
          background: transparent;
          color: #64748b;
        }
        .tab-btn.inactive:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .section-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid #f1f5f9;
          animation: fadeSlideUp 0.5s ease both;
        }

        .dept-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          transition: all 0.2s;
          cursor: default;
        }
        .dept-pill:hover {
          background: #f1f5f9;
          transform: translateX(3px);
        }
      `}</style>

      <div className="dashboard-root" style={{ padding: "28px 32px", background: "#f8fafc", minHeight: "100vh" }}>

        {/* ── Top Bar ── */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 32, animation: "fadeSlideUp 0.4s ease both",
        }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
              आयुर्वेद ड्यासबोर्ड
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: 4 }}>
              आयुर्वेद सेवा व्यवस्थापन प्रणालीमा स्वागत छ
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Date */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: "10px", padding: "8px 14px",
              fontSize: "13px", color: "#475569", fontWeight: 500,
            }}>
              <Calendar size={15} />
              {new Date().toLocaleDateString("ne-NP", { year: "numeric", month: "long", day: "numeric" })}
            </div>

            {/* Bell */}
            <div style={{
              width: 38, height: 38, borderRadius: "10px",
              background: "#fff", border: "1px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}>
              <Bell size={16} color="#475569" />
              <div style={{
                position: "absolute", top: 7, right: 7,
                width: 7, height: 7, borderRadius: "50%",
                background: "#ef4444", border: "2px solid #fff",
              }} />
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 18, marginBottom: 28,
        }}>
          {CARDS.map((card, i) => <StatCard key={i} {...card} index={i} />)}
        </div>

        {/* ── Charts Row 1 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>

          {/* Area Chart — Weekly/Monthly toggle */}
          <div className="section-card" style={{ animationDelay: "0.3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0 }}>बिरामी प्रवाह</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: 2 }}>दैनिक / मासिक तुलना</p>
              </div>
              <div style={{ display: "flex", gap: 4, background: "#f8fafc", padding: 4, borderRadius: 10 }}>
                <button className={`tab-btn ${activeTab === "weekly" ? "active" : "inactive"}`} onClick={() => setActiveTab("weekly")}>साप्ताहिक</button>
                <button className={`tab-btn ${activeTab === "monthly" ? "active" : "inactive"}`} onClick={() => setActiveTab("monthly")}>मासिक</button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={activeTab === "weekly" ? weeklyData : monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradTreatments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey={activeTab === "weekly" ? "day" : "month"} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey={activeTab === "weekly" ? "patients" : "registrations"} name="बिरामी" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gradPatients)" dot={false} />
                <Area type="monotone" dataKey={activeTab === "weekly" ? "treatments" : "services"} name="सेवा" stroke="#10b981" strokeWidth={2.5} fill="url(#gradTreatments)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart — Monthly Registrations */}
          <div className="section-card" style={{ animationDelay: "0.35s" }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0 }}>वार्षिक दर्ता</h3>
              <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: 2 }}>महिनाअनुसार दर्ता तथा सेवा</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={14} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="registrations" name="दर्ता" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="services" name="सेवा" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Charts Row 2 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 18 }}>

          {/* Pie Chart */}
          <div className="section-card" style={{ animationDelay: "0.4s" }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0 }}>विभागअनुसार सेवा</h3>
              <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: 2 }}>आजको वितरण</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {departmentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {departmentData.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "11px", color: "#475569" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  {d.name}
                </div>
              ))}
            </div>
          </div>

          {/* Department List */}
          <div className="section-card" style={{ animationDelay: "0.45s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0 }}>विभाग अवलोकन</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: 2 }}>आजको सेवा स्थिति</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {departmentData.map((dept, i) => (
                <div key={i} className="dept-pill">
                  <div style={{
                    width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
                    background: dept.color + "20",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Activity size={16} style={{ color: dept.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{dept.name}</div>
                    <div style={{ marginTop: 4, height: 4, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 4,
                        background: dept.color,
                        width: `${dept.value * 2.5}%`,
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: dept.color, minWidth: 28, textAlign: "right" }}>
                    {dept.value}
                  </div>
                  <ArrowUpRight size={14} style={{ color: "#cbd5e1" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;