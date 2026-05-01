import { useState } from "react";

const FISCAL_YEARS = ["आर्थिक वर्ष", "२०८२/८३", "२०८१/८२", "२०८०/७९", "२०७९/७८"];

const YOGA_SERVICES = [
  "सुक्ष्म व्यायाम",
  "आसन",
  "प्राणायाम",
  "षट्कर्म",
  "ध्यान",
  "अन्य",
];

const initData = () =>
  YOGA_SERVICES.reduce((acc, svc) => {
    acc[svc] = { startF: 0, startM: 0, endF: 0, endM: 0 };
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
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
  subGroupTh: {
    background: "#f5f8fb",
    textAlign: "center",
    fontWeight: 600,
    padding: "6px 8px",
    border: "1px solid #dde",
    fontSize: 12,
    color: "#555",
  },
  labelTh: {
    background: "#f0f6f9",
    fontWeight: 600,
    textAlign: "center",
    padding: "6px 10px",
    border: "1px solid #d0dde8",
    fontSize: 13,
    color: "#333",
    verticalAlign: "middle",
  },
  svcTd: {
    border: "1px solid #eee",
    padding: "8px 12px",
    textAlign: "center",
    background: "#fafafa",
    fontWeight: 500,
    color: "#444",
  },
  svcTdAlt: {
    border: "1px solid #eee",
    padding: "8px 12px",
    textAlign: "center",
    background: "#f2f5f8",
    fontWeight: 600,
    color: "#444",
  },
  dataTd: {
    border: "1px solid #eee",
    padding: "7px 8px",
    textAlign: "center",
    color: "#555",
  },
  dataTdAlt: {
    border: "1px solid #eee",
    padding: "7px 8px",
    textAlign: "center",
    color: "#444",
    background: "#f9f9f9",
  },
  jammaTd: {
    border: "1px solid #dde",
    padding: "8px 8px",
    textAlign: "center",
    fontWeight: 700,
    background: "#eaf3f7",
    color: "#222",
    fontSize: 13,
  },
  jammaLabelTd: {
    border: "1px solid #dde",
    padding: "8px 12px",
    textAlign: "center",
    fontWeight: 700,
    background: "#eaf3f7",
    color: "#222",
    fontSize: 13,
  },
};

export default function YogSevaPratiwedan() {
  const [fiscalYear, setFiscalYear] = useState("आर्थिक वर्ष");
  const [mitiDekhi, setMitiDekhi]   = useState("");
  const [mitiSamma, setMitiSamma]   = useState("");
  const [data]                      = useState(initData);

  const startFTotal = YOGA_SERVICES.reduce((s, svc) => s + (data[svc]?.startF || 0), 0);
  const startMTotal = YOGA_SERVICES.reduce((s, svc) => s + (data[svc]?.startM || 0), 0);
  const endFTotal   = YOGA_SERVICES.reduce((s, svc) => s + (data[svc]?.endF   || 0), 0);
  const endMTotal   = YOGA_SERVICES.reduce((s, svc) => s + (data[svc]?.endM   || 0), 0);

  const startTotal = startFTotal + startMTotal;
  const endTotal   = endFTotal   + endMTotal;

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>योग सेवा प्रतिवेदन</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}योग सेवा प्रतिवेदन
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
              {/* Section title */}
              <tr>
                <th colSpan={5} style={s.sectionTitleTh}>
                  ३. उपचारात्मक योग सेवा प्रतिवेदन
                </th>
              </tr>
              {/* Group headers */}
              <tr>
                <th rowSpan={2} style={s.labelTh}>योग अनुसारको सेवा विवरण</th>
                <th colSpan={2} style={s.groupTh}>सेवा सुरू गर्नेको जम्मा संख्या</th>
                <th colSpan={2} style={s.groupTh}>सेवा पुरा गर्नेको जम्मा संख्या</th>
              </tr>
              {/* Sub-group: महिला / पुरुष */}
              <tr>
                <th style={s.subGroupTh}>महिला</th>
                <th style={s.subGroupTh}>पुरुष</th>
                <th style={s.subGroupTh}>महिला</th>
                <th style={s.subGroupTh}>पुरुष</th>
              </tr>
            </thead>

            <tbody>
              {YOGA_SERVICES.map((svc, i) => {
                const isAlt = i % 2 !== 0;
                const row   = data[svc];
                return (
                  <tr key={svc}>
                    <td style={isAlt ? s.svcTdAlt : s.svcTd}>{svc}</td>
                    <td style={isAlt ? s.dataTdAlt : s.dataTd}>{row.startF}</td>
                    <td style={isAlt ? s.dataTdAlt : s.dataTd}>{row.startM}</td>
                    <td style={isAlt ? s.dataTdAlt : s.dataTd}>{row.endF}</td>
                    <td style={isAlt ? s.dataTdAlt : s.dataTd}>{row.endM}</td>
                  </tr>
                );
              })}

              {/* जम्मा संख्या row */}
              <tr>
                <td style={s.jammaLabelTd}>जम्मा संख्या</td>
                <td colSpan={2} style={s.jammaTd}>{startTotal}</td>
                <td colSpan={2} style={s.jammaTd}>{endTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}