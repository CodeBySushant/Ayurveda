import { useState } from "react";

const FISCAL_YEARS = ["आर्थिक वर्ष", "२०८२/८३", "२०८१/८२", "२०८०/७९", "२०७९/७८"];

const COLUMN_GROUPS = [
  { label: "सेवा लिएको जम्मा संख्या", key: "total" },
  { label: "स्नेहन (>=६० वर्ष)",       key: "snehan" },
  { label: "स्वेदन (>=६० वर्ष)",       key: "swedan" },
  { label: "रसायन औषधी सेवन",         key: "rasayan" },
];

const initData = () =>
  COLUMN_GROUPS.reduce((acc, g) => {
    acc[g.key] = { F: 0, M: 0 };
    return acc;
  }, {});

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
  groupTh: {
    background: "#f0f6f9",
    textAlign: "center",
    fontWeight: 600,
    padding: "8px 6px",
    border: "1px solid #d0dde8",
    fontSize: 13,
    color: "#333",
  },
  subTh: {
    background: "#f5f8fb",
    textAlign: "center",
    fontWeight: 600,
    padding: "7px 8px",
    border: "1px solid #dde",
    fontSize: 13,
    color: "#444",
    width: "12.5%",
  },
  dataTd: {
    border: "1px solid #eee",
    padding: "10px 8px",
    textAlign: "center",
    color: "#555",
    fontSize: 13,
    background: "white",
  },
};

export default function JesthNagarikSevaPratiwedan() {
  const [fiscalYear, setFiscalYear] = useState("आर्थिक वर्ष");
  const [mitiDekhi,  setMitiDekhi]  = useState("");
  const [mitiSamma,  setMitiSamma]  = useState("");
  const [data]                      = useState(initData);

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>जेष्ठ नागरिक सेवा प्रतिवेदन</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}जेष्ठ नागरिक सेवा प्रतिवेदन
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
              {/* Section Title */}
              <tr>
                <th colSpan={8} style={s.sectionTitleTh}>
                  ४. जेष्ठ नागरिक सेवा प्रतिवेदन
                </th>
              </tr>
              {/* Group headers */}
              <tr>
                {COLUMN_GROUPS.map(g => (
                  <th key={g.key} colSpan={2} style={s.groupTh}>{g.label}</th>
                ))}
              </tr>
              {/* महिला / पुरुष sub-headers */}
              <tr>
                {COLUMN_GROUPS.map(g => (
                  <>
                    <th key={`${g.key}-F`} style={s.subTh}>महिला</th>
                    <th key={`${g.key}-M`} style={s.subTh}>पुरुष</th>
                  </>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {COLUMN_GROUPS.map(g => (
                  <>
                    <td key={`${g.key}-F`} style={s.dataTd}>{data[g.key].F}</td>
                    <td key={`${g.key}-M`} style={s.dataTd}>{data[g.key].M}</td>
                  </>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}