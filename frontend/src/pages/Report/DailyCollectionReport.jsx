import { useState } from "react";

const FISCAL_YEARS = ["आर्थिक वर्ष", "२०८२/८३", "२०८१/८२", "२०८०/७९", "२०७९/७८"];

// Sample service rows — replace with API data as needed
const SAMPLE_DATA = [];

const s = {
  root: {
    fontFamily: "'Noto Sans Devanagari', 'Noto Sans', 'Segoe UI', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    fontSize: 13,
    color: "#333",
  },
  nav: {
    background: "#e8eaf0",
    borderBottom: "1px solid #d0d3db",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navTitle: { fontWeight: 700, fontSize: 17, color: "#222" },
  navBreadcrumb: { fontSize: 13, color: "#555" },
  navLink: { color: "#1565c0", textDecoration: "none", fontWeight: 500 },
  filterBar: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#f0f2f5",
    flexWrap: "wrap",
  },
  select: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 13,
    height: 34,
    background: "white",
    cursor: "pointer",
    minWidth: 170,
  },
  slash: { fontSize: 16, fontWeight: 700, color: "#555", padding: "0 2px" },
  label: { fontSize: 13, color: "#444", fontWeight: 500 },
  input: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 13,
    height: 34,
    background: "white",
    outline: "none",
    width: 140,
  },
  searchBtn: {
    background: "#3fa7bf",
    color: "white",
    border: "none",
    borderRadius: 4,
    width: 38,
    height: 34,
    fontSize: 16,
    cursor: "pointer",
  },
  printBtn: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "5px 16px",
    height: 34,
    fontSize: 13,
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 600,
  },
  pageBody: { padding: "12px 20px 24px" },
  tableWrapper: {
    background: "white",
    border: "1px solid #dde",
    borderRadius: 4,
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  sectionTitleTh: {
    background: "#eaf3f7",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 14,
    padding: "10px 8px",
    border: "1px solid #d0dde8",
    color: "#2c5f7a",
  },
  headerTh: {
    background: "#f0f6f9",
    fontWeight: 600,
    padding: "9px 16px",
    border: "1px solid #d0dde8",
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  td: (alt) => ({
    border: "1px solid #eee",
    padding: "9px 16px",
    textAlign: "center",
    background: alt ? "#f9fafb" : "white",
    color: "#444",
    fontSize: 13,
  }),
  noDataTd: {
    border: "1px solid #eee",
    padding: "20px",
    textAlign: "center",
    color: "#aaa",
    fontSize: 13,
    background: "#fafafa",
  },
};

export default function SankulanPratiwedan() {
  const [fiscalYear, setFiscalYear] = useState("आर्थिक वर्ष");
  const [mitiDekhi,  setMitiDekhi]  = useState("");
  const [mitiSamma,  setMitiSamma]  = useState("");
  const [data]                      = useState(SAMPLE_DATA);

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>सङ्कुलन प्रतिवेदन</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}सङ्कुलन प्रतिवेदन
        </span>
      </div>

      {/* Filter Bar */}
      <div style={s.filterBar}>
        <select style={s.select} value={fiscalYear} onChange={e => setFiscalYear(e.target.value)}>
          {FISCAL_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <span style={s.slash}>/</span>

        <input
          style={s.input}
          placeholder="मिति"
          value={mitiDekhi}
          onChange={e => setMitiDekhi(e.target.value)}
        />
        <span style={s.label}>देखि</span>
        <input
          style={s.input}
          placeholder="मिति"
          value={mitiSamma}
          onChange={e => setMitiSamma(e.target.value)}
        />
        <span style={s.label}>सम्म</span>
        <button style={s.searchBtn}>🔍</button>

        <button style={s.printBtn} onClick={() => window.print()}>
          🖨 प्रिन्ट गर्नुहोस्
        </button>
      </div>

      {/* Table */}
      <div style={s.pageBody}>
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              <tr>
                <th colSpan={2} style={s.sectionTitleTh}>
                  सङ्कुलन प्रतिवेदन
                </th>
              </tr>
              <tr>
                <th style={{ ...s.headerTh, textAlign: "center", width: "50%" }}>सेवा</th>
                <th style={{ ...s.headerTh, textAlign: "center", width: "50%" }}>सङ्कुलन (रू)</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={2} style={s.noDataTd}>
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td(i % 2 !== 0)}>{row.sewa}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.sankulan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}